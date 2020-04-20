import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'

export function setupNodelete(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('nodelete', async (ctx) => {
    if (ctx.chat.type === 'private') {
      const chat = await findChat(ctx.chat.id)
      ctx.reply(loc('no_work_private', chat.language))
      return
    }
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) return
    // Get chat
    let chat = await findChat(ctx.chat.id)
    chat.nodelete = !chat.nodelete
    await chat.save()
    // Reply
    return ctx.reply(loc(`nodelete_${chat.nodelete}`, chat.language), {
      disable_notification: true,
    })
  })
}
