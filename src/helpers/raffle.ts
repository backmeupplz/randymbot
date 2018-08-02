// Dependencies
import { ContextMessageUpdate, Telegraf } from 'telegraf'
import { addRaffle, getRaffle, Raffle } from '../models'
import { ExtraEditMessage } from 'telegraf/typings/telegram-types'
import { shuffle, random } from 'lodash'
import { checkIfAdmin } from './checkAdmin'

// Raffle text
const raffleText = 'Розыгрыш начался! Нажмите на кнопку ниже, чтобы принять участие. Победитель будет выбран случайным образом из участников, когда администраторы ответят на это сообщение. Желаю удачи!'

/**
 * Starting a new raffle
 * @param ctx Context of the message that started
 */
export async function startRaffle(ctx: ContextMessageUpdate) {
  // Send message
  const sent = await ctx.replyWithMarkdown(raffleText)
  // Add raffle
  const raffle = await addRaffle(sent.chat.id, sent.message_id)
  // Add buttons
  const options: ExtraEditMessage = {
    reply_markup: getButtons(raffle),
  };
  (<any>options).reply_markup = JSON.stringify(options.reply_markup)
  await ctx.telegram.editMessageText(sent.chat.id, sent.message_id, undefined, raffleText, options)
}

/**
 * Setting up callbacl for the raffle participation button
 * @param bot Bot to setup the callback
 */
export function setupCallback(bot: Telegraf<ContextMessageUpdate>) {
  (<any>bot).action(async (data: string, ctx: ContextMessageUpdate) => {
    // Get raffle
    const datas = data.split('~')
    const chatId = Number(datas[0])
    const messageId = Number(datas[1])
    let raffle = await getRaffle(chatId, messageId)
    // Check if already in
    if (raffle.participantsIds.indexOf(ctx.from.id) > -1) {
      await (<any>ctx).answerCbQuery('Вы уже принимаете участие, отлично!', undefined, true)
      return
    }
    // Add participant and update number
    raffle.participantsIds.push(ctx.from.id)
    raffle = await raffle.save()
    // Reply that they are in
    await await (<any>ctx).answerCbQuery('Отлично, вы отметились, как участник!', undefined, true)
    // Update counter of participants
    try {
      // Add buttons
      const options: ExtraEditMessage = {
        reply_markup: getButtons(raffle),
      }
      const text = `${raffleText}\n\nКоличество участников: ${raffle.participantsIds.length}`
      await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text, options)
    } catch (err) {
      // Do nothing
    }
  })
}

/**
 * Setting up listener for the raffle endings
 * @param bot 
 */
export function setupListener(bot: Telegraf<ContextMessageUpdate>) {
  bot.use(async (ctx, next) => {
    try {
      // Check if reply to bot's message
      if (!ctx.message || !ctx.message.reply_to_message || ctx.message.reply_to_message.from.username !== process.env.USERNAME) {
        return next()
      }
      // Check if admin replied
      const isAdmin = await checkIfAdmin(ctx)
      if (!isAdmin) {
        return next()
      }
      // Get reply message
      const reply = ctx.message.reply_to_message
      // Check if there is raffle to the reply message
      const raffle = await getRaffle(reply.chat.id, reply.message_id)
      if (!raffle) {
        return next()
      }
      // Check if no winner yet
      if (raffle.winner) {
        return next()
      }
      // Finish raffle
      await finishRaffle(raffle, ctx)
    } catch (err) {
      // Do nothing
    }
    // Continue
    next()
  })
}

/**
 * Buttons for a raffle
 * @param raffle Raffle to provide buttons to
 * @returns buttons for a raffle
 */
function getButtons(raffle: Raffle) {
  return {
    inline_keyboard: [
      [{
        text: 'Участвовать!',
        callback_data: `${raffle.chatId}~${raffle.messageId}`,
      }],
    ],
  }
}

/**
 * Finishing raffle
 * @param raffle Raffle to finish
 * @param ctx Context of message that finished raffle
 */
async function finishRaffle(raffle: Raffle, ctx: ContextMessageUpdate) {
  // Get participants ids
  let ids = raffle.participantsIds
  // Check if there were participants
  if (ids.length <= 0) {
    const text = 'В этот раз участников розыгрыша не было 😅'
    await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text)
    return
  }
  // Get winner
  ids = shuffle(ids)
  const winnerIndex = random(ids.length-1)
  const winnerId = ids[winnerIndex]
  const winner = await ctx.telegram.getChatMember(raffle.chatId, winnerId)
  // Announce winner
  const name =
    winner.user.username ? `@${winner.user.username}` :
    `${winner.user.first_name}${winner.user.last_name ? ` ${winner.user.last_name}` : ''}`
  const text = `🎉 В этот раз победитель — [${name}](tg://user?id=${winner.user.id})! Поздравляем!\n\nВсего было участников — ${ids.length}.`
  await ctx.telegram.editMessageText(raffle.chatId, raffle.messageId, undefined, text, {
    parse_mode: 'Markdown',
  })
  // Save winner
  raffle.winner = winner.user.id
  await (<any>raffle).save()
}