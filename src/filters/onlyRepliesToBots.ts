import Context from '@/models/Context'

export default function onlyRepliesToBots(ctx: Context) {
  return !!ctx.message?.reply_to_message?.from?.is_bot
}
