import Context from '@/models/Context'

export default function onlyMessageWithParameters(ctx: Context) {
  return (
    !!ctx.message?.text &&
    ctx.message.text.includes('$numberOfParticipants') &&
    ctx.message.text.includes('$winner')
  )
}
