import { addChatIdFromAdminChatIds, findOrCreateChat } from '@/models/Chat'
import Context from '@/models/Context'

export default async function addChatToAdminChatIds(ctx: Context) {
  if (!ctx.chat || !ctx.from) return

  const { doc: from } = await findOrCreateChat(ctx.from.id)

  return addChatIdFromAdminChatIds(from.chatId, ctx.chat.id)
}
