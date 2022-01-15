import { findOrCreateChat } from '@/models/Chat'
import Context from '@/models/Context'

export default async function addAdminChatIds(ctx: Context) {
  if (!ctx.chat || !ctx.from) return

  const { doc: chat } = await findOrCreateChat(ctx.from.id)

  ctx.dbchat.creatorId = ctx.from.id
  await ctx.dbchat.save()

  chat.adminChatIds.push(ctx.chat.id)
  return chat.save()
}
