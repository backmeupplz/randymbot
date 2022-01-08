import Context from '@/models/Context'

const onlyMessageWithParameters = (parameters: string[]) => (ctx: Context) => {
  return (
    !!ctx.msg?.text &&
    !parameters.find((param) => !ctx.msg?.text?.includes(param))
  )
}

export default onlyMessageWithParameters
