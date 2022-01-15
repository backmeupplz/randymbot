import { NextFunction } from 'grammy'
// import { findChat, findOrCreateChat } from '@/models/Chat'
import { findOrCreateChat } from '@/models/Chat'
import Context from '@/models/Context'

export default async function attachChat(ctx: Context, next: NextFunction) {
  if (!ctx.chat) {
    return
  }

  const { doc: chat } = await findOrCreateChat(ctx.chat.id)
  ctx.dbchat = chat
  return next()
}
