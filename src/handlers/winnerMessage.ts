import Context from '@/models/Context'

export default async function handleCustomWinnerMessage(ctx: Context) {
  const sentMessage = await ctx.replyWithLocalization('custom_winner_message')

  ctx.dbchat.winnerMessageSetupMessageId = sentMessage.message_id
  await ctx.dbchat.save()

  if (ctx.dbchat.winnerMessage?.text) {
    await ctx.reply(ctx.dbchat.winnerMessage.text, {
      entities: ctx.dbchat.winnerMessage.entities,
    })
  }
}
