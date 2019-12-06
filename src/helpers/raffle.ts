// Dependencies
import { ContextMessageUpdate, Telegraf } from 'telegraf'
import { addRaffle, getRaffle, Raffle } from '../models'
import {
  ExtraEditMessage,
  ChatMember,
  Message,
} from 'telegraf/typings/telegram-types'
import { shuffle, random } from 'lodash'
import { checkIfAdmin } from './checkAdmin'
import { findChat } from '../models/chat'
import { loc } from './locale'
import { InstanceType } from 'typegoose'

/**
 * Starting a new raffle
 * @param ctx Context of the message that started
 */
export async function startRaffle(ctx: ContextMessageUpdate) {
  // Get chat
  const chat = await findChat(ctx.chat.id)
  // Add raffle
  const raffle = await addRaffle(ctx.chat.id)
  // Save raffle message if required
  if (chat.raffleMessage) {
    raffle.raffleMessage = chat.raffleMessage
    await raffle.save()
  }
  // Add buttons
  const options: ExtraEditMessage = {
    reply_markup: getButtons(raffle, chat.language),
    parse_mode: 'HTML',
  }
  // Send message
  let sent: Message
  if (raffle.raffleMessage) {
    const raffleMessage = raffle.raffleMessage
    raffleMessage.text = raffleMessage.text.replace(
      '$numberOfParticipants',
      '0'
    )
    sent = await ctx.telegram.sendCopy(ctx.chat.id, raffleMessage, {
      reply_markup: getButtons(raffle, chat.language),
    })
  } else {
    sent = await ctx.replyWithHTML(
      loc(
        chat.number > 1 ? 'raffle_text_multiple' : 'raffle_text',
        chat.language
      ),
      options
    )
  }
  // Save sent message id
  raffle.messageId = sent.message_id
  await raffle.save()
}

/**
 * Setting up callback for the raffle participation button
 * @param bot Bot to setup the callback
 */
export function setupCallback(bot: Telegraf<ContextMessageUpdate>) {
  ;(<any>bot).action(async (data: string, ctx: ContextMessageUpdate) => {
    // Get raffle
    const datas = data.split('~')
    if (['l', 'n'].indexOf(datas[0]) > -1) return
    const chatId = Number(datas[0])
    let raffle = await getRaffle(chatId, datas[1])
    // Get chat
    const chat = await findChat(ctx.chat.id)
    // Check if raffle is there
    if (!raffle) {
      await (<any>ctx).answerCbQuery(
        loc('please_retry', chat.language),
        undefined,
        true
      )
      return
    }
    // Check if raffle is finished
    if (raffle.winners) {
      await (<any>ctx).answerCbQuery(
        loc('raffle_over', chat.language),
        undefined,
        true
      )
      return
    }
    // Check if already in
    if (raffle.participantsIds.indexOf(ctx.from.id) > -1) {
      await (<any>ctx).answerCbQuery(
        loc('already_participating', chat.language),
        undefined,
        true
      )
      return
    }
    // Check if participant subscribed
    if (chat.subscribe) {
      try {
        const member = await ctx.telegram.getChatMember(
          `@${chat.subscribe}`,
          ctx.from.id
        )
        if (
          !member.status ||
          member.status === 'left' ||
          member.status === 'kicked'
        ) {
          throw new Error()
        }
      } catch (err) {
        return (<any>ctx).answerCbQuery(
          `${loc('check_subscription', chat.language)}@${chat.subscribe}`,
          undefined,
          true
        )
      }
    }
    // Add participant and update number
    raffle.participantsIds.push(ctx.from.id)
    raffle = await raffle.save()
    // Reply that they are in
    await (<any>ctx).answerCbQuery(
      loc('participated', chat.language),
      undefined,
      true
    )
    // Update counter of participants
    try {
      // Add buttons
      const options: ExtraEditMessage = {
        reply_markup: getButtons(raffle, chat.language),
      }
      let text: string
      if (raffle.raffleMessage) {
        const raffleMessage = raffle.raffleMessage
        text = raffleMessage.text.replace(
          '$numberOfParticipants',
          `${raffle.participantsIds.length}`
        )
      } else {
        text = `${loc(
          chat.number > 1 ? 'raffle_text_multiple' : 'raffle_text',
          chat.language
        )}\n\n${loc('participants_number', chat.language)}: ${
          raffle.participantsIds.length
        }`
      }
      await ctx.telegram.editMessageText(
        raffle.chatId,
        raffle.messageId,
        undefined,
        text,
        options
      )
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
      const message = ctx.message || ctx.channelPost
      // Check if reply to bot's message
      if (
        !message ||
        !message.reply_to_message ||
        !message.reply_to_message.text
      ) {
        throw new Error('Not checking')
      }
      // Check if admin replied
      const isAdmin = await checkIfAdmin(ctx)
      if (!isAdmin) {
        throw new Error('No admin')
      }
      // Get reply message
      const reply = message.reply_to_message
      // Check if there is raffle to the reply message
      const raffle = await getRaffle(reply.chat.id, reply.message_id)
      if (!raffle) {
        throw new Error('No raffle')
      }
      // Check if no winner yet
      if (raffle.winners) {
        throw new Error('No winners')
      }
      // Finish raffle
      await finishRaffle(raffle, ctx)
    } catch (err) {
      // Do nothing
    } finally {
      // Continue
      next()
    }
  })
}

/**
 * Buttons for a raffle
 * @param raffle Raffle to provide buttons to
 * @param language Languageof thebuttons
 * @returns buttons for a raffle
 */
function getButtons(raffle: InstanceType<Raffle>, language: string) {
  return {
    inline_keyboard: [
      [
        {
          text: loc('participate_button', language),
          callback_data: `${raffle.chatId}~${raffle.id}`,
        },
      ],
    ],
  }
}

/**
 * Finishing raffle
 * @param raffle Raffle to finish
 * @param ctx Context of message that finished raffle
 */
async function finishRaffle(raffle: Raffle, ctx: ContextMessageUpdate) {
  console.log(`Finishing raffle for chat ${raffle.chatId}`)
  // Get participants ids
  let ids = raffle.participantsIds
  const idsOriginalLength = ids.length
  // Get chat
  const chat = await findChat(ctx.chat.id)
  // Check if there were participants
  if (ids.length <= 0) {
    const text = loc('no_participants', chat.language)
    await ctx.telegram.editMessageText(
      raffle.chatId,
      raffle.messageId,
      undefined,
      text
    )
    return
  }
  // Get winners
  ids = shuffle(ids)
  let winners: {
    name: string
    winner: ChatMember
  }[] = []
  while (winners.length < chat.number) {
    // Check if not enough participants
    if (ids.length + winners.length < chat.number) {
      const text = loc('not_enough_participants', chat.language)
      await ctx.telegram.editMessageText(
        raffle.chatId,
        raffle.messageId,
        undefined,
        text
      )
      return
    }
    const winnerIndex = random(ids.length - 1)
    const winnerId = ids.splice(winnerIndex, 1)[0]
    try {
      const winner = await ctx.telegram.getChatMember(raffle.chatId, winnerId)
      const name = winner.user.username
        ? `@${winner.user.username}`
        : `${winner.user.first_name}${
            winner.user.last_name ? ` ${winner.user.last_name}` : ''
          }`
      if (winners.map(w => w.winner.user.id).indexOf(winner.user.id) < 0) {
        winners.push({ name, winner })
      }
    } catch (err) {
      // Do nothing
    }
  }
  winners = shuffle(winners)
  console.log(
    `Finishing raffle for chat ${raffle.chatId}, winners length: ${winners.length}`
  )
  // Save winners
  raffle.winners = winners.map(w => w.winner.user.id).join(',')
  await (<any>raffle).save()
  // Announce winner
  if (winners.length == 1) {
    const winner = winners[0].winner
    const name = winners[0].name.replace('<', '').replace('>', '')
    let text: string
    if (raffle.winnerMessage) {
      text = raffle.winnerMessage.text
        .replace(
          '$winner',
          `<a href="tg://user?id=${winner.user.id}">${name}</a>`
        )
        .replace('$numberOfParticipants', `${idsOriginalLength}`)
    } else {
      text = `🎉 ${loc('winner', chat.language)} — <a href="tg://user?id=${
        winner.user.id
      }">${name}</a>! ${loc('congratulations', chat.language)}!\n\n${loc(
        'participants_number',
        chat.language
      )} — ${idsOriginalLength}.`
    }
    await ctx.telegram.editMessageText(
      raffle.chatId,
      raffle.messageId,
      undefined,
      text,
      {
        parse_mode: 'HTML',
      }
    )
  } else {
    const names = winners.map(w => w.name.replace('<', '').replace('>', ''))
    if (names.length <= 50 || raffle.winnerMessage) {
      let text: string
      if (raffle.winnerMessage) {
        text = raffle.winnerMessage.text
          .replace(
            '$winner',
            names
              .map(
                (name, i) =>
                  `<a href="tg://user?id=${winners[i].winner.user.id}">${name}</a>`
              )
              .join(', ')
          )
          .replace('$numberOfParticipants', `${idsOriginalLength}`)
      } else {
        text = `🎉 ${loc('winners', chat.language)}:\n`
        for (let i = 0; i < names.length; i++) {
          text = `${text}\n${i + 1}. <a href="tg://user?id=${
            winners[i].winner.user.id
          }">${names[i]}</a>`
        }
        text = `${text}\n\n${loc('congratulations', chat.language)}!\n\n${loc(
          'participants_number',
          chat.language
        )} — ${idsOriginalLength}.`
      }
      await ctx.telegram.editMessageText(
        raffle.chatId,
        raffle.messageId,
        undefined,
        text,
        {
          parse_mode: 'HTML',
        }
      )
    } else {
      let commonI = 0
      let text = `🎉 ${loc('winners', chat.language)}:\n`
      const firstNames = names.splice(0, 50)
      const firstWinners = winners.splice(0, 50)
      for (let i = 0; i < firstNames.length; i++) {
        commonI++
        text = `${text}\n${commonI}. <a href="tg://user?id=${firstWinners[i].winner.user.id}">${firstNames[i]}</a>`
      }
      text = `${text}\n\n${loc('congratulations', chat.language)}!\n\n${loc(
        'participants_number',
        chat.language
      )} — ${idsOriginalLength}.`
      console.log(`Announcing winners for ${raffle.chatId}`, raffle.messageId)
      console.log(text)
      await ctx.telegram.editMessageText(
        raffle.chatId,
        raffle.messageId,
        undefined,
        text,
        {
          parse_mode: 'HTML',
        }
      )
      while (names.length > 0) {
        let text = ``
        const nextNames = names.splice(0, 50)
        const nextWinners = winners.splice(0, 50)
        for (let i = 0; i < nextNames.length; i++) {
          commonI++
          text = `${text}\n${commonI}. <a href="tg://user?id=${nextWinners[i].winner.user.id}">${nextNames[i]}</a>`
        }
        await ctx.telegram.sendMessage(raffle.chatId, text, {
          parse_mode: 'HTML',
        })
      }
    }
  }
}
