import Context from '@/models/Context'

export default async function saveWinnerMessage(ctx: Context) {
  if (!ctx.msg?.text) return

  await ctx.sendCopy(ctx.msg)

  ctx.dbchat.winnerMessage = ctx.msg
  await ctx.dbchat.save()

  return ctx.replyWithLocalization('success')
}
