import { deleteAdminChatIds, deleteEditedChatId } from '@/models/Chat'
import Context from '@/models/Context'

export default async function removeChatFromConfigurableChats(ctx: Context) {
  if (!ctx.chat) return

  await deleteAdminChatIds(ctx.chat.id)
  return deleteEditedChatId(ctx.chat.id)
}
