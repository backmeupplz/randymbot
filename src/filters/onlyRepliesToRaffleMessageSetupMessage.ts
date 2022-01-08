import Context from '@/models/Context'

export default function onlyRepliesToRaffleMessageSetupMessage(ctx: Context) {
  return (
    !!ctx.dbchat.raffleMessageSetupMessageId &&
    ctx.message?.reply_to_message?.message_id ===
      ctx.dbchat.raffleMessageSetupMessageId
  )
}
