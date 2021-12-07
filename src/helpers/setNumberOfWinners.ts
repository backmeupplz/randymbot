import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function setNumberOfWinners(
  ctx: Context,
  numberOfWinners: number
) {
  ctx.dbchat.number = numberOfWinners
  await ctx.dbchat.save()
  const text = ctx.i18n.t('number_of_winners_selected', {
    numberOfWinners,
  })
  const options = { ...sendOptions(ctx), reply_markup: undefined }
  if (ctx.callbackQuery) {
    return ctx.editMessageText(text, options)
  } else {
    return ctx.reply(text, options)
  }
}
