import Context from '@/models/Context'

export default function onlyRepliesToWinnerMessageSetupMessage(ctx: Context) {
  return (
    !!ctx.dbchat.winnerMessageSetupMessageId &&
    ctx.message?.reply_to_message?.message_id ===
      ctx.dbchat.winnerMessageSetupMessageId
  )
}
