// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { markdownishToTelegramHtml, replyWithHtml } from '../helpers/telegramHtml'

export function setupTestLocale(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('testLocales', async ctx => {
    if (ctx.from.id !== 76104711) {
      return
    }
    const { loc, localizations } = require('../helpers/locale')
    for (const key of Object.keys(localizations)) {
      const value = localizations[key]
      for (const local of Object.keys(value)) {
        try {
          await replyWithHtml(ctx, markdownishToTelegramHtml(loc(key, local)))
        } catch (err) {
          console.log(key, local, err.message)
        }
      }
    }
    console.log('Done')
  })
}
