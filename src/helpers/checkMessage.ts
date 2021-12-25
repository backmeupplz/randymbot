import Context from '@/models/Context'
import bot from '@/helpers/bot'
import checkReplyMessageId from '@/filters/checkReplyMessageId'
import onlyMessageWithParameters from '@/filters/onlyMessageWithParameters'
import onlyRepliesToBots from '@/filters/onlyRepliesToBots'

export default function checkReplyWinnerMessage() {
  bot
    .on('message')
    .filter(onlyRepliesToBots)
    .filter(checkReplyMessageId)
    .filter(onlyMessageWithParameters, async (ctx: Context) => {
      ctx.dbchat.winnerMessage = ctx.message
      await ctx.dbchat.save()

      if (!ctx.dbchat.winnerMessage?.text) {
        return false
      }

      await ctx.reply(ctx.dbchat.winnerMessage.text)
      return ctx.replyWithLocalization('success')
    })
}
