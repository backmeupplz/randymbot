import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'
import { getChatIdForConfig } from '../helpers/getChatIdForConfig'

export function setupNodelete(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('nodelete', async (ctx) => {
    // Get chat id
    const chatId = await getChatIdForConfig(ctx)
    if (!chatId) {
      return
    }
    // Get chat
    let chat = await findChat(chatId)
    chat.nodelete = !chat.nodelete
    await chat.save()
    // Reply
    return ctx.reply(loc(`nodelete_${chat.nodelete}`, chat.language), {
      disable_notification: true,
    })
  })
}
