import Context from '@/models/Context'

export default function handleId(ctx: Context) {
  return ctx.reply(`${ctx.chat?.id}, ${ctx.from?.id}`)
}
