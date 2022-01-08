import Context from '@/models/Context'

export default async function saveWinnerMessage(ctx: Context) {
  if (!ctx.message?.text) return

  await ctx.sendCopy(ctx.message)

  ctx.dbchat.winnerMessage = ctx.message
  await ctx.dbchat.save()

  return ctx.replyWithLocalization('success')
}
