import { deleteFromAdminChatIds, deleteFromEditedChatId } from '@/models/Chat'
import Context from '@/models/Context'

export default async function removeChatFromConfigurableChats(ctx: Context) {
  if (!ctx.chat) return

  await deleteFromAdminChatIds(ctx.chat.id)
  return deleteFromEditedChatId(ctx.chat.id)
}
