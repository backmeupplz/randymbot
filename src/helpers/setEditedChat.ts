import {
  addChatIdToEditedChatId,
  deleteOneFromEditedChatId,
} from '@/models/Chat'
import Context from '@/models/Context'
import getChatIdFromCallbackQuery from '@/helpers/getChatIdFromCallbackQuery'

export default async function setEditedChat(ctx: Context) {
  await ctx.answerCallbackQuery()
  const chatId = getChatIdFromCallbackQuery(ctx)

  if (!ctx.from) {
    throw new Error('author not found')
  }

  if (ctx.me.id === chatId) {
    await deleteOneFromEditedChatId(ctx.from.id)
    return ctx.replyWithLocalization('now_editing_this_private_chat')
  }

  const { status: userChatMemberStatus } = await ctx.api.getChatMember(
    chatId,
    ctx.from.id
  )

  if (
    ['left', 'kicked', 'member', 'restricted'].includes(userChatMemberStatus)
  ) {
    return ctx.replyWithLocalization('not_is_admin')
  }

  const chat = await ctx.api.getChat(chatId)

  if (chat.type === 'private') {
    throw new Error('should not be private')
  }

  await addChatIdToEditedChatId(ctx.from.id, chatId)

  return ctx.reply(
    ctx.i18n.t('now_editing_this_chat', {
      chat: chat.title,
    })
  )
}
