import { NextFunction } from 'grammy'
import Context from '@/models/Context'

export default function onlyPrivateChats(ctx: Context, next: NextFunction) {
  return ctx.chat?.type === 'private'
    ? next()
    : ctx.replyWithLocalization('only_private_error')
}
