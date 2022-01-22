import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

const onlyMessageWithParameters =
  (parameters: string[]) => async (ctx: Context) => {
    const msgInclParams = !parameters.find(
      (param) => !ctx.msg?.text?.includes(param)
    )

    if (msgInclParams) return true

    const params = parameters.join(', ')
    const text = ctx.i18n.t('parameters_missing_message', {
      params,
    })

    await ctx.reply(text, sendOptions(ctx))
    return false
  }

export default onlyMessageWithParameters
