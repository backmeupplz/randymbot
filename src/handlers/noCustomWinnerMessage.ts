import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function handleNoCustomWinnerMessage(ctx: Context) {
  ctx.dbchat.winnerMessage = undefined
  await ctx.dbchat.save()
  return ctx.replyWithLocalization('no_winner_message', sendOptions(ctx))
}
