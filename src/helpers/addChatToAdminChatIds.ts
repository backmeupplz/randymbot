import { addChatIdToAdminChatIds, findOrCreateChat } from '@/models/Chat'
import Context from '@/models/Context'

export default async function addChatToAdminChatIds(ctx: Context) {
  if (!ctx.chat || !ctx.from) {
    throw new Error('Chat or User is undefined')
  }

  const { doc: from } = await findOrCreateChat(ctx.from.id)

  return addChatIdToAdminChatIds(from.chatId, ctx.chat.id)
}
