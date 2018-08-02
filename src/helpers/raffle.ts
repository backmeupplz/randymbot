// Dependencies
import { ContextMessageUpdate, Telegraf } from 'telegraf'
import { addRaffle, getRaffle, Raffle } from '../models'
import { ExtraEditMessage } from 'telegraf/typings/telegram-types'

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