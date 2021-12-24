import Context from '@/models/Context'
import bot from '@/helpers/bot'
import sendOptions from '@/helpers/sendOptions'

export default async function handleCustomWinnerMessage(ctx: Context) {
  const answer = await ctx.replyWithLocalization(
    'custom_winner_message',
    sendOptions(ctx)
  )

  ctx.dbchat.idFixedMessage = answer.message_id
  await ctx.dbchat.save()

  if (ctx.dbchat.winnerMessage) {
    await ctx.reply(ctx.dbchat.winnerMessage)
  }

  bot
    .on('message')
    .filter((ctx) => {
      return (
        ctx.message.reply_to_message?.message_id === ctx.dbchat.idFixedMessage
      )
    })
    .filter(
      (ctx) => {
        if (!ctx.message.text) {
          return false
        }

        return (
          ctx.message.text.includes('$numberOfParticipants') &&
          ctx.message.text.includes('$winner')
        )
      },
      async (ctx: Context) => {
        ctx.dbchat.winnerMessage = ctx.message?.text
        await ctx.dbchat.save()
        await ctx.reply(<string>ctx.dbchat.winnerMessage)
        return ctx.replyWithLocalization('success')
      }
    )

  return
}
