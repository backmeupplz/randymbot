import { GrammyError } from 'grammy'
import Context from '@/models/Context'

export default async function handleAddChat(ctx: Context) {
  if (!ctx.match) {
    return ctx.replyWithLocalization('arguments_missing')
  }

  let chat
  const regExUsernameOrId = /^[@][a-zA-Z]\w+|^[-]?\d+/g

  try {
    const chatId = regExUsernameOrId.exec(`${ctx.match}`)

    if (!chatId?.length) return ctx.replyWithLocalization('incorrect_id')

    chat = await ctx.api.getChat(chatId[0])
  } catch (err) {
    if (err instanceof GrammyError) {
      if (err.description.includes('Bad Request: chat not found')) {
        return ctx.replyWithLocalization('chat_not_found_error')
      } else if (
        err.description.includes(
          'Forbidden: bot was kicked from the channel chat'
        )
      ) {
        return ctx.replyWithLocalization('bot_not_admin_chat')
      }
    }
  }

  if (!chat) {
    return ctx.replyWithLocalization('bot_not_admin_chat')
  }

  const chatMember = await ctx.api.getChatMember(chat.id, ctx.me.id)

  if (
    chatMember.status === 'administrator' &&
    (chatMember.can_delete_messages ||
      (chatMember.can_delete_messages &&
        chatMember.can_post_messages &&
        chatMember.can_edit_messages))
  ) {
    return ctx.replyWithLocalization('config_raffle_instructions')
  }

  return ctx.replyWithLocalization('bot_not_admin_chat')
}
