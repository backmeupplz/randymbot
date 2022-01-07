import Context from '@/models/Context'
import saveRaffleMessage from '@/helpers/saveRaffleMessage'
import saveWinnerMessage from '@/helpers/saveWinnerMessage'

export default function saveMessage(ctx: Context) {
  if (ctx.dbchat.typeMessage === 'winnerMessageSetupMessageId') {
    return saveWinnerMessage(ctx)
  }

  if (ctx.dbchat.typeMessage === 'raffleMessageSetupMessageId') {
    return saveRaffleMessage(ctx)
  }
}
