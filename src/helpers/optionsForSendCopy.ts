import Context from '@/models/Context'

export default function optionsForSendCopy(ctx: Context) {
  if (ctx.message?.text === '/customWinnerMessage') {
    return {
      entities: ctx.dbchat.winnerMessage?.entities,
    }
  }

  if (ctx.message?.text === '/customRaffleMessage') {
    return {
      entities: ctx.dbchat.raffleMessage?.entities,
    }
  }

  return {
    entities: ctx.message?.entities,
  }
}
