import { ContextMessageUpdate, Telegraf } from 'telegraf'
import { findChat } from '../models/Chat'
import { getChatIdForConfig } from '../helpers/getChatIdForConfig'
import { loc } from '../helpers/locale'

export function setupNodelete(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('nodelete', async (ctx) => {
    // Get chat id
    const chatId = await getChatIdForConfig(ctx)
    if (!chatId) {
      return
    }
    // Get chat
    const chat = await findChat(chatId)
    chat.nodelete = !chat.nodelete
    await chat.save()
    // Reply
    return ctx.reply(loc(`nodelete_${chat.nodelete}`, chat.language), {
      disable_notification: true,
    })
  })
}
