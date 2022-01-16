import Context from '@/models/Context'

export default async function setEditedChat(ctx: Context) {
  await ctx.answerCallbackQuery()

  const chat = await ctx.api.getChat(Number(ctx.chatId))

  if (chat.type === 'private') {
    ctx.dbchat.editedChatId = undefined
    await ctx.dbchat.save()
    return ctx.replyWithLocalization('now_editing_this_private_chat')
  }

  ctx.dbchat.editedChatId = chat.id
  await ctx.dbchat.save()

  return ctx.reply(
    ctx.i18n.t('now_editing_this_chat', {
      chat: chat.title,
    })
  )
}
