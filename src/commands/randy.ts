// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { startRaffle } from '../helpers/raffle'

/**
 * Setting up the randy command
 * @param bot Bot to setup the command
 */
export function setupRandy(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('randy', async (ctx) => {
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) return
    // Reply
    if (ctx.chat.type === 'private') {
      ctx.reply('Простите, но эта команда не работает в личке с ботом.')
      return
    } else {
      startRaffle(ctx)
      try {
        await ctx.deleteMessage()
      } catch (err) {
        // Do nothing
      }
    }
  })
}