import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'
import { getChatIdForConfig } from '../helpers/getChatIdForConfig'

export function setupNosubscribe(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('nosubscribe', async (ctx) => {
    // Get chat id
    const chatId = await getChatIdForConfig(ctx)
    if (!chatId) {
      return
    }
    // Get chat
    let chat = await findChat(chatId)
    chat.subscribe = undefined
    await chat.save()
    // Reply
    return ctx.reply(loc('nosubscribe_success', chat.language), {
      disable_notification: true,
    })
  })
}
