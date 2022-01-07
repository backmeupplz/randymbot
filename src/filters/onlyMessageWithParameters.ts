import Context from '@/models/Context'

export default function onlyMessageWithParameters(ctx: Context) {
  if (ctx.message?.text) {
    if (ctx.dbchat.typeMessage === 'winnerMessageSetupMessageId') {
      if (
        ctx.message.text.includes('$numberOfParticipants') &&
        ctx.message.text.includes('$winner')
      ) {
        return true
      }
    }

    if (ctx.dbchat.typeMessage === 'raffleMessageSetupMessageId') {
      if (
        ctx.message.text.includes('$numberOfParticipants') &&
        !ctx.message.text.includes('$winner')
      ) {
        return true
      }
    }
  }

  return false
}
