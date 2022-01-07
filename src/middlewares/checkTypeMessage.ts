import { NextFunction } from 'grammy'
import Context from '@/models/Context'

export default async function checkTypeMessage(
  ctx: Context,
  next: NextFunction
) {
  if (
    ctx.message?.reply_to_message?.text?.includes('$numberOfParticipants') &&
    ctx.message?.reply_to_message?.text?.includes('$winner')
  ) {
    ctx.dbchat.typeMessage = 'winnerMessageSetupMessageId'
    await ctx.dbchat.save()

    return next()
  } else if (
    ctx.message?.reply_to_message?.text?.includes('$numberOfParticipants') &&
    !ctx.message?.reply_to_message?.text?.includes('$winner')
  ) {
    ctx.dbchat.typeMessage = 'raffleMessageSetupMessageId'
    await ctx.dbchat.save()

    return next()
  }
}
