import Context from '@/models/Context'

export default function onlyRepliesToRaffleMessageSetupMessage(ctx: Context) {
  return (
    !!ctx.dbchat.raffleMessageSetupMessageId &&
    ctx.msg?.reply_to_message?.message_id ===
      ctx.dbchat.raffleMessageSetupMessageId
  )
}
