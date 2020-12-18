import { findChat } from '../models/chat'
import { ContextMessageUpdate } from 'telegraf'
import { loc } from './locale'
import { checkIfAdminInChat } from './checkIfEditedAdmin'
import { checkIfAdmin } from './checkAdmin'

export async function getChatIdForConfig(ctx: ContextMessageUpdate) {
  if (ctx.chat.type === 'private') {
    // Get private chat
    const privateChat = await findChat(ctx.chat.id)
    // Check if in editing mode
    if (!privateChat.editedChatId) {
      await ctx.reply(loc('no_work_private', privateChat.language))
      return undefined
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
