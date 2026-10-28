// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'
import { keyboard, markdown, startPayload } from '../helpers/promo'
import { promo } from '../helpers/promoBot'

/**
 * Setting up the start and help commands
 * @param bot Bot to setup the commands
 */
export function setupStartAndHelp(bot: Telegraf<ContextMessageUpdate>) {
  bot.command(['start', 'help'], async (ctx) => {
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) return
    // Get chat
    const chat = await findChat(ctx.chat.id)
    // Cross-promo (private chats only): someone another bot's campaign sent here,
    // and a promo line or button under the reply for users in a test arm
    const isPrivate = ctx.chat.type === 'private'
    if (isPrivate)
      await promo.arrived(
        ctx.from && ctx.from.id,
        startPayload(ctx.message && ctx.message.text),
        Date.now() - (chat._id as any).getTimestamp().getTime() < 10 * 60_000
      )
    const d = isPrivate
      ? await promo.decide(ctx.from && ctx.from.id, 'private', chat.language)
      : null
    // Reply
    const text = loc('public_help_start', chat.language)
    await ctx.replyWithMarkdown(text + markdown(d && d.promo), {
      disable_notification: true,
      disable_web_page_preview: true,
      reply_markup: keyboard(d && d.promo) as any,
    })
    await promo.record(d)
  })
}
