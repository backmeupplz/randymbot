import {
  deleteChatIdFromAdminChatIds,
  deleteChatIdFromEditedChatId,
} from '@/models/Chat'
import Context from '@/models/Context'

export default async function removeChatFromConfigurableChats(ctx: Context) {
  if (!ctx.chat) {
    throw new Error('Chat is undefined')
  }

  await deleteChatIdFromAdminChatIds(ctx.chat.id)
  return deleteChatIdFromEditedChatId(ctx.chat.id)
}
