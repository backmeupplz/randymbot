import { Menu } from '@grammyjs/menu'
import Context from '@/models/Context'
import setNumberOfWinners from '@/helpers/setNumberOfWinners'

const optionRows = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]

const numberOfWinnersMenu = new Menu<Context>('numberOfWinners')

optionRows.forEach((optionRow) => {
  optionRow.forEach((numberOfWinners, i) => {
    numberOfWinnersMenu.text(
      numberOfWinners.toString(),
      // checkMenuPresser(notThePersonWhoCreatedMenuErrorHandler),
      (ctx) => setNumberOfWinners(ctx, numberOfWinners)
    )
    if (i % 4 === 3) {
      numberOfWinnersMenu.row()
    }
  })
})

export default numberOfWinnersMenu
