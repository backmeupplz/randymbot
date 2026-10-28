// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { startRaffle } from '../helpers/raffle'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'
import { promo } from '../helpers/promoBot'

/**
 * Setting up the randy command
 * @param bot Bot to setup the command
 */
export function setupRandy(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('randy', async ctx => {
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) return
    // Reply
    if (ctx.chat.type === 'private') {
      const chat = await findChat(ctx.chat.id)
      ctx.reply(loc('no_work_private', chat.language))
      return
    } else {
      // a raffle within 7 days of arriving from another bot's campaign
      void promo.used(ctx.from && ctx.from.id)
      startRaffle(ctx)
      try {
        await ctx.deleteMessage()
      } catch (err) {
        // Do nothing
      }
    }
  })
}
