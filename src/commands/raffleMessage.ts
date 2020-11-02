import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'

export function setupRaffleMessage(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('raffleMessage', async (ctx) => {
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) return
    // Get chat
    const chat = await findChat(ctx.chat.id)
    // Check if private
    if (ctx.chat.type === 'private') {
      ctx.reply(loc('no_work_private', chat.language))
      return
    }
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
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) return
    // Get chat
    const chat = await findChat(ctx.chat.id)
    // Check if private
    if (ctx.chat.type === 'private') {
      ctx.reply(loc('no_work_private', chat.language))
      return
    }
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
      // Check if admin
      const isAdmin = await checkIfAdmin(ctx, false)
      if (!isAdmin) return
      // Check if private
      if (ctx.chat.type === 'private') return
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
      // Get chat
      const chat = await findChat(ctx.chat.id)
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
