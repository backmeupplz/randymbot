import { updateAdminChatIds, updateEditedChatId } from '@/models/Chat'
import Context from '@/models/Context'

export default async function removeChatFromConfigurableChats(ctx: Context) {
  if (!ctx.chat) return

  await updateAdminChatIds(ctx.chat.id)
  return updateEditedChatId(ctx.chat.id)
}
