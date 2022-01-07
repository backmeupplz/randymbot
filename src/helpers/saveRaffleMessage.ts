import Context from '@/models/Context'

export default async function saveRaffleMessage(ctx: Context) {
  if (!ctx.message?.text) {
    return
  }

  await ctx.sendCopy(ctx.message.text)

  ctx.dbchat.raffleMessage = ctx.message
  await ctx.dbchat.save()

  return ctx.replyWithLocalization('success')
}
