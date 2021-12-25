import Context from '@/models/Context'

export default function checkReplyMessageId(ctx: Context) {
  return (
    ctx.message?.reply_to_message?.message_id ===
    ctx.dbchat.winnerMessageSetupMessageId
  )
}
