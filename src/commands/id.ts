import { Telegraf, ContextMessageUpdate } from 'telegraf'

export function setupId(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('id', async (ctx) => {
    return ctx.reply(`${ctx.chat.id}, ${ctx.from.id}`)
  })
}
