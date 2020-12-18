import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'
import { getChatIdForConfig } from '../helpers/getChatIdForConfig'

export function setupRaffleMessage(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('raffleMessage', async (ctx) => {
    // Get chat id
    const chatId = await getChatIdForConfig(ctx)
    if (!chatId) {
      return
    }
    // Get chat
    const chat = await findChat(chatId)
    // Send instructions
    await ctx.reply(loc('raffle_message', chat.language), {
      disable_notification: true,
    })
    // Check if needs to send current message
    if (chat.raffleMessage) {
      return ctx.telegram.sendCopy(ctx.chat.id, chat.raffleMessage)
    }
  })

  bot.command('noRaffleMessage', async (ctx) => {
    // Get chat id
    const chatId = await getChatIdForConfig(ctx)
    if (!chatId) {
      return
    }
    // Get chat
    const chat = await findChat(chatId)
    // Turn off raffle message
    chat.raffleMessage = undefined
    await chat.save()
    // Send instructions
    return ctx.reply(loc('raffle_message_off', chat.language), {
      disable_notification: true,
    })
  })

  bot.use(async (ctx, next) => {
    try {
      // Check if reply
      const message = ctx.message || ctx.channelPost
      if (
        !message ||
        !message.reply_to_message ||
        !message.reply_to_message.text ||
        (!message.text && !message.caption) ||
        (message.text && !message.text.includes('$numberOfParticipants')) ||
        (message.caption &&
          !message.caption.includes('$numberOfParticipants')) ||
        !(
          (message.reply_to_message.from &&
            message.reply_to_message.from.username === bot.options.username) ||
          ctx.chat.type === 'channel'
        ) ||
        !message.reply_to_message.text ||
        !message.reply_to_message.text.includes('💪')
      ) {
        return
      }
      // Get chat id
      const chatId = await getChatIdForConfig(ctx)
      if (!chatId) {
        return
      }
      // Get chat
      const chat = await findChat(chatId)
      // Send mesage
      await ctx.telegram.sendCopy(ctx.chat.id, message, {
        disable_notification: true,
      })
      // Setuo message
      chat.raffleMessage = message
      await chat.save()
      // Reply success
      ctx.reply(loc('success', chat.language), {
        disable_notification: true,
      })
    } finally {
      next()
    }
  })
}
