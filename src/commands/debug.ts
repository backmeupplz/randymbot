import { Telegraf, ContextMessageUpdate } from 'telegraf'

export function setupDebug(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('debug', async (ctx) => {
    if (ctx.from?.id !== +process.env.ADMIN) {
      return
    }
    return ctx.replyWithHTML(
      `<code>${JSON.stringify(ctx.update, undefined, 2)}</code>`,
      {
        reply_to_message_id: ctx.message.message_id,
      }
    )
  })
}
