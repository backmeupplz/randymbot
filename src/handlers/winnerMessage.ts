import { Message } from '@grammyjs/types'
import Context from '@/models/Context'
import bot from '@/helpers/bot'

export default async function handleCustomWinnerMessage(ctx: Context) {
  const answer = await ctx.replyWithLocalization('custom_winner_message', {
    reply_to_message_id: undefined,
  })

  if (ctx.dbchat.winnerMessage) {
    await ctx.reply(ctx.dbchat.winnerMessage as unknown as string)
  }

  const currentUser = ctx.message?.from?.id

  bot
    .on('message')
    .filter(
      (ctx) => ctx.message.reply_to_message?.message_id === answer.message_id
    )
    .filter((ctx) =>
      ctx.message.text?.includes('$numberOfParticipants') &&
      ctx.message.text?.includes('$winner')
        ? true
        : false
    )
    .filter(
      (ctx) => ctx.message.from?.id === currentUser,
      async (ctx: Context) => {
        ctx.dbchat.winnerMessage = ctx.message?.text as unknown as Message
        await ctx.dbchat.save()
        await ctx.reply(ctx.dbchat.winnerMessage as unknown as string)
        return ctx.replyWithLocalization('success', {
          reply_to_message_id: undefined,
        })
      }
    )

  return
}
