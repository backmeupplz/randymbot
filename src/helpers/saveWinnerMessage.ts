import Context from '@/models/Context'

export default async function saveWinnerMessage(ctx: Context) {
  ctx.dbchat.winnerMessage = ctx.message
  await ctx.dbchat.save()

  if (!ctx.dbchat.winnerMessage?.text) {
    return false
  }

  await ctx.reply(ctx.dbchat.winnerMessage.text, {
    entities: ctx.dbchat.winnerMessage.entities,
  })
  return ctx.replyWithLocalization('success')
}
