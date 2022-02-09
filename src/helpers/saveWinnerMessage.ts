import {
  setWinnerMessageForChat,
  setWinnerMessageForChats,
} from '@/models/Chat'
import Context from '@/models/Context'

export default async function saveWinnerMessage(ctx: Context) {
  if (!ctx.chat || !ctx.msg?.text) return

  await ctx.sendCopy(ctx.msg)

  ctx.dbchat.winnerMessage = ctx.msg
  await ctx.dbchat.save()

  if (ctx.chat.type !== 'private') {
    await setWinnerMessageForChats(ctx.chat.id, ctx.msg)
  }

  if (ctx.chat.type === 'private' && ctx.dbchat.editedChatId) {
    await setWinnerMessageForChat(ctx.dbchat.editedChatId, ctx.msg)
  }

  return ctx.replyWithLocalization('success')
}
