import Context from '@/models/Context'

const onlyMessageWithParameters =
  (parameters: string[]) => async (ctx: Context) => {
    return (
      (!!ctx.msg?.text &&
        !parameters.find((param) => !ctx.msg?.text?.includes(param))) ||
      !(await ctx.reply(
        `Please, use ${parameters.join(', ')} in the message text.`
      ))
    )
  }

export default onlyMessageWithParameters
