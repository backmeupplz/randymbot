import Context from '@/models/Context'

export default function onlyMessageWithParameters(ctx: Context) {
  if (!ctx.message?.text) {
    return false
  }

  return (
    ctx.message.text.includes('$numberOfParticipants') &&
    ctx.message.text.includes('$winner')
  )
}
