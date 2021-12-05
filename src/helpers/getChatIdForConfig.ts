import { ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from './checkAdmin'
import { checkIfAdminInChat } from './checkIfEditedAdmin'
import { findChat } from '../models/Chat'
import { loc } from './locale'

export async function getChatIdForConfig(
  ctx: ContextMessageUpdate,
  shouldAllowCommandInPrivate = false
) {
  if (ctx.chat.type === 'private') {
    // Get private chat
    const privateChat = await findChat(ctx.chat.id)
    // Check if in editing mode
    if (!privateChat.editedChatId) {
      if (shouldAllowCommandInPrivate) {
        return privateChat.chatId
      } else {
        await ctx.reply(loc('config_raffle_no_chats', privateChat.language))
        return undefined
      }
    } else {
      // Check if admin
      if (
        !(await checkIfAdminInChat(ctx, ctx.from.id, privateChat.editedChatId))
      ) {
        await ctx.reply(loc('mustBeAnAdmin', privateChat.language))
        return undefined
      }
      // Return chat id
      return privateChat.editedChatId
    }
  } else {
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) {
      return undefined
    }
    // Return chatId
    return ctx.chat.id
  }
}
