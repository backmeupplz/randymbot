import {
  setRaffleMessageForChat,
  setRaffleMessageForChats,
} from '@/models/Chat'
import Context from '@/models/Context'

export default async function saveRaffleMessage(ctx: Context) {
  if (!ctx.chat || !ctx.msg?.text) return

  await ctx.sendCopy(ctx.msg)

  ctx.dbchat.raffleMessage = ctx.msg
  await ctx.dbchat.save()

  if (ctx.chat.type !== 'private') {
    await setRaffleMessageForChats(ctx.chat.id, ctx.msg)
  }

  if (ctx.chat.type === 'private' && ctx.dbchat.editedChatId) {
    await setRaffleMessageForChat(ctx.dbchat.editedChatId, ctx.msg)
  }

  return ctx.replyWithLocalization('success')
}
