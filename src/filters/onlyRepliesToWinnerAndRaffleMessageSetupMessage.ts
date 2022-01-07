import Context from '@/models/Context'

export default function onlyRepliesToWinnerAndRaffleMessageSetupMessage(
  ctx: Context
) {
  if (!ctx.dbchat.typeMessage) {
    return false
  }

  return (
    !!ctx.dbchat[ctx.dbchat.typeMessage] &&
    ctx.message?.reply_to_message?.message_id ===
      ctx.dbchat[ctx.dbchat.typeMessage]
  )
}
