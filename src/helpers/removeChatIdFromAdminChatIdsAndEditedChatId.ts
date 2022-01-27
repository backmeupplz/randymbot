import {
  deleteOneFromAdminChatIds,
  deleteOneFromEditedChatId,
} from '@/models/Chat'
import Context from '@/models/Context'

export default async function removeChatIdFromAdminChatIdsAndEditedChatId(
  ctx: Context
) {
  if (!ctx.chatMember) {
    throw new Error('ChatMemberUpdated is undefined')
  }

  const userId = ctx.chatMember.new_chat_member.user.id
  const chatId = ctx.chatMember.chat.id

  await deleteOneFromAdminChatIds(userId, chatId)
  return deleteOneFromEditedChatId(userId)
}
