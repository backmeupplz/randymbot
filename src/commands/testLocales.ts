// Dependencies
import { Telegraf, ContextMessageUpdate, Extra } from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

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
          await ctx.reply(loc(key, local), Extra.markdown(
            true
          ) as ExtraReplyMessage)
        } catch (err) {
          console.log(key, local, err.message)
        }
      }
    }
    console.log('Done')
  })
}
