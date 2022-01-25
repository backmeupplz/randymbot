import { GrammyError } from 'grammy'
import { addChatIdToAdminChatIds } from '@/models/Chat'
import Context from '@/models/Context'

export default async function handleAddChat(ctx: Context) {
  if (!ctx.from) return

  if (!ctx.match) {
    return ctx.replyWithLocalization('arguments_missing')
  }

  const regExUsernameOrId = /^[@][a-zA-Z]\w+|^[-]?\d+/g
  const chatId = regExUsernameOrId.exec(`${ctx.match}`)

  if (!chatId?.length) {
    return ctx.replyWithLocalization('incorrect_id')
  }

  try {
    const chat = await ctx.api.getChat(chatId[0])
    // Get information about me
    const chatMember = await ctx.api.getChatMember(chat.id, ctx.me.id)
    // Get information about users
    const { status: userChatMemberStatus } = await ctx.api.getChatMember(
      chat.id,
      ctx.from.id
    )

    if (!['creator', 'administrator'].includes(userChatMemberStatus)) {
      return ctx.replyWithLocalization('not_is_admin')
    }

    if (
      chatMember.status === 'administrator' &&
      // For chat type group or supergroup
      (chatMember.can_delete_messages ||
        //For chat type channel
        (chatMember.can_delete_messages &&
          chatMember.can_post_messages &&
          chatMember.can_edit_messages))
    ) {
      await addChatIdToAdminChatIds(ctx.from.id, chat.id)
      return ctx.replyWithLocalization('config_raffle_instructions')
    }

    return ctx.replyWithLocalization('bot_not_admin_chat')
  } catch (err) {
    if (err instanceof GrammyError) {
      if (err.description.includes('chat not found')) {
        return ctx.replyWithLocalization('chat_not_found_error')
      }

      if (
        [
          'Bad Request: user not found',
          'Forbidden: bot was kicked from the channel chat',
        ].includes(err.description)
      ) {
        return ctx.replyWithLocalization('bot_not_admin_chat')
      }
    }
  }
}
