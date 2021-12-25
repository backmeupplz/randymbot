import Context from '@/models/Context'

export default function onlyRepliesToBots(ctx: Context) {
  if (!ctx.message?.reply_to_message?.from?.is_bot) {
    return false
  }

  return ctx.message.reply_to_message.from.is_bot
}
