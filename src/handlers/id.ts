import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default function handleId(ctx: Context) {
  return ctx.reply(`<code>${ctx.chat?.id}</code>`, {
    ...sendOptions(ctx),
    parse_mode: 'HTML',
  })
}
