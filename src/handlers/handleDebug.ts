import Context from '@/models/Context'

export default function handleDebug(ctx: Context) {
  return ctx.reply(`<code>${JSON.stringify(ctx.update, undefined, 2)}</code>`, {
    parse_mode: 'HTML',
  })
}
