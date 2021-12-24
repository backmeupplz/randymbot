import Context from '@/models/Context'
import bot from '@/helpers/bot'

export default function checkReplyWinnerMessage() {
  bot
    .on('message')
    .filter((ctx: Context) => {
      return (
        ctx.message?.reply_to_message?.message_id ===
        ctx.dbchat.currentIdMessage
      )
    })
    .filter(
      (ctx: Context) => {
        if (!ctx.message?.text) {
          return false
        }

        return (
          ctx.message.text.includes('$numberOfParticipants') &&
          ctx.message.text.includes('$winner')
        )
      },
      async (ctx: Context) => {
        ctx.dbchat.winnerMessage = ctx.message
        await ctx.dbchat.save()
        await ctx.reply(<string>ctx.dbchat.winnerMessage?.text)
        return ctx.replyWithLocalization('success')
      }
    )
}
