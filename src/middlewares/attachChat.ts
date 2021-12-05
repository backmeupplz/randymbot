import { NextFunction } from 'grammy'
import { findOrCreateChat } from '@/models/Chat'
import Context from '@/models/Context'

export default async function attachChat(ctx: Context, next: NextFunction) {
  if (!ctx.from) {
    return
  }
  const { doc: chat } = await findOrCreateChat(ctx.from.id)
  ctx.dbchat = chat
  return next()
}
