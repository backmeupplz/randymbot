import { NextFunction } from 'grammy'
import Context from '@/models/Context'

export default function onlyWithEditedChatId(ctx: Context, next: NextFunction) {
  if (ctx.chat?.type === 'private' && ctx.dbchat.editedChatId === undefined) {
    return ctx.replyWithLocalization('config_raffle_no_chats')
  }

  return next()
}
