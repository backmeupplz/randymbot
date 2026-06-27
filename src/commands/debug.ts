import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { escapeTelegramHtml, replyWithHtml } from '../helpers/telegramHtml'

export function setupDebug(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('debug', async (ctx) => {
    if (ctx.from && ctx.from.id !== parseInt(process.env.ADMIN, 10)) {
      return
    }
    return replyWithHtml(
      ctx,
      `<code>${escapeTelegramHtml(JSON.stringify(ctx.update, undefined, 2))}</code>`,
      {
        reply_to_message_id: ctx.message.message_id,
      }
    )
  })
}
