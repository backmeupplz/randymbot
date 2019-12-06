import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'

export function setupRaffleMessage(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('winnerMessage', async ctx => {
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
    await ctx.reply(loc('winner_message', chat.language), {
      disable_notification: true,
    })
    // Send current message if there is one
    if (chat.winnerMessage) {
      return ctx.telegram.sendCopy(ctx.chat.id, chat.winnerMessage)
    }
  })

  bot.command('noWinnerMessage', async ctx => {
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
    chat.winnerMessage = undefined
    await chat.save()
    // Send instructions
    return ctx.reply(loc('winner_message_off', chat.language), {
      disable_notification: true,
    })
  })

  bot.use(async (ctx, next) => {
    try {
      // Check if admin
      const isAdmin = await checkIfAdmin(ctx)
      if (!isAdmin) return
      // Check if private
      if (ctx.chat.type === 'private') return
      // Check if reply
      const message = ctx.message || ctx.channelPost
      if (
        !message ||
        !message.reply_to_message ||
        !message.reply_to_message ||
        !message.text ||
        !message.text.includes('$numberOfParticipants') ||
        !message.text.includes('$winner') ||
        message.reply_to_message.from.username !== bot.options.username ||
        !message.reply_to_message.text ||
        !message.reply_to_message.text.includes('🎉')
      ) {
        return
      }
      // Get chat
      const chat = await findChat(ctx.chat.id)
      // Send mesage
      await ctx.telegram.sendCopy(ctx.chat.id, message, {
        disable_notification: true,
        parse_mode: 'HTML',
      })
      // Setuo message
      chat.winnerMessage = message
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
