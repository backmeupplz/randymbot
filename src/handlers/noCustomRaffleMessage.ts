import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function handleNoCustomRaffleMessage(ctx: Context) {
  ctx.dbchat.raffleMessage = undefined
  await ctx.dbchat.save()
  return ctx.replyWithLocalization('no_raffle_message', sendOptions(ctx))
}
