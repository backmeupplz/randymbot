import { findOrCreateChat } from '@/models/Chat'
import Context from '@/models/Context'

export default async function addChatFromConfigurableChats(ctx: Context) {
  if (!ctx.chat || !ctx.from) return

  const { doc: chat } = await findOrCreateChat(ctx.from.id)

  chat.adminChatIds.push(ctx.chat.id)
  return chat.save()
}
