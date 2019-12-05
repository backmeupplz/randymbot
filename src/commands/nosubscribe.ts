import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'

export function setupNosubscribe(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('nosubscribe', async ctx => {
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) return
    // Get chat
    let chat = await findChat(ctx.chat.id)
    chat.subscribe = undefined
    await chat.save()
    // Reply
    return ctx.reply(loc('nosubscribe_success', chat.language), {
      disable_notification: true,
    })
  })
}
