import { InlineKeyboard } from 'grammy'
import Context from '@/models/Context'

export default async function handleConfigRaffle(ctx: Context) {
  if (!ctx.dbchat.adminChatIds.length) {
    return ctx.replyWithLocalization('config_raffle_no_chats')
  }

  const inlineKeyboard = new InlineKeyboard()

  for (let i = 0; i < ctx.dbchat.adminChatIds.length; i++) {
    const chatId = ctx.dbchat.adminChatIds[i]
    const chat = await ctx.api.getChat(chatId)

    if (chat.type === 'private') return

    inlineKeyboard.text(chat.title, `chat:${chat.id}`).row()
  }

  inlineKeyboard.text(ctx.i18n.t('private_messages'), `chat:${ctx.me.id}`)

  return ctx.replyWithLocalization('select_chat', {
    reply_markup: inlineKeyboard,
  })
}
