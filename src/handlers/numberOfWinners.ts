import Context from '@/models/Context'
import numberOfWinnersMenu from '@/menus/numberOfWinners'
import sendOptions from '@/helpers/sendOptions'
import setNumberOfWinners from '@/helpers/setNumberOfWinners'

export default function handleNumberOfWinners(ctx: Context) {
  const numberOfWinners =
    !!ctx.match &&
    typeof ctx.match === 'string' &&
    !isNaN(+ctx.match) &&
    +ctx.match < 1000000 &&
    +ctx.match > 0 &&
    +ctx.match
  if (numberOfWinners) {
    return setNumberOfWinners(ctx, numberOfWinners)
  }
  return ctx.replyWithLocalization('number_of_winners', {
    ...sendOptions(ctx),
    reply_markup: numberOfWinnersMenu,
  })
}
