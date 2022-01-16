import { NextFunction } from 'grammy'
import Context from '@/models/Context'

export default async function botRemovedFromAdminChatIds(
  ctx: Context,
  next: NextFunction
) {
  ctx.chatId = ctx.callbackQuery?.data?.replace('chat:', '')

  if (!ctx.chatId) {
    throw new Error('faulty processing chatId')
  }

  if (!ctx.dbchat.adminChatIds.includes(Number(ctx.chatId))) {
    await ctx.answerCallbackQuery()
    return ctx.replyWithLocalization('bot_not_admin_chat')
  }

  return next()
}
