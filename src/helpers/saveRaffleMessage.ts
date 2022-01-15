import Context from '@/models/Context'

export default async function saveRaffleMessage(ctx: Context) {
  if (!ctx.msg?.text) return

  await ctx.sendCopy(ctx.msg)

  ctx.dbchat.raffleMessage = ctx.msg
  await ctx.dbchat.save()

  return ctx.replyWithLocalization('success')
}
