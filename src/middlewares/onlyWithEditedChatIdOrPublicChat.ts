import { NextFunction } from 'grammy'
import Context from '@/models/Context'

export default function onlyWithEditedChatIdOrPublicChat(
  ctx: Context,
  next: NextFunction
) {
  if (ctx.chat?.type === 'private' && !ctx.dbchat.editedChatId) {
    return ctx.replyWithLocalization('config_raffle_no_chats')
  }

  return next()
}
