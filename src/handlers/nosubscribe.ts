// import { ContextMessageUpdate, Telegraf } from 'telegraf'
// import { findChat } from '../models/Chat'
// import { getChatIdForConfig } from '../helpers/getChatIdForConfig'
// import { loc } from '../helpers/locale'

// export function setupNosubscribe(bot: Telegraf<ContextMessageUpdate>) {
//   bot.command('nosubscribe', async (ctx) => {
//     // Get chat id
//     const chatId = await getChatIdForConfig(ctx)
//     if (!chatId) {
//       return
//     }
//     // Get chat
//     const chat = await findChat(chatId)
//     chat.subscribe = undefined
//     await chat.save()
//     // Reply
//     return ctx.reply(loc('nosubscribe_success', chat.language), {
//       disable_notification: true,
//     })
//   })
// }
