import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function keepRaffleMessage(ctx: Context) {
  ctx.dbchat.nodelete = !ctx.dbchat.nodelete
  await ctx.dbchat.save()
  return ctx.replyWithLocalization(
    `keep_raffle_message_${ctx.dbchat.nodelete}`,
    sendOptions(ctx)
  )
}
