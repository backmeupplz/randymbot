import { NextFunction } from 'grammy'
import Context from '@/models/Context'
import getChatIdFromCallbackQuery from '@/helpers/getChatIdFromCallbackQuery'

export default async function botRemovedFromAdminChatIds(
  ctx: Context,
  next: NextFunction
) {
  await ctx.answerCallbackQuery()
  const chatId = getChatIdFromCallbackQuery(ctx)

  if (!ctx.dbchat.adminChatIds.includes(Number(chatId))) {
    return ctx.replyWithLocalization('bot_not_admin_chat')
  }

  return next()
}
