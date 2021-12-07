import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default function handleDebug(ctx: Context) {
  return ctx.reply(`<code>${JSON.stringify(ctx.update, undefined, 2)}</code>`, {
    ...sendOptions(ctx),
    parse_mode: 'HTML',
  })
}
