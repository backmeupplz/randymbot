// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'
import { chatKind } from '../helpers/promo'
import { promo } from '../helpers/promoBot'

/**
 * /promos [on|off]: group admins turn Prime Radiant's group promos (a button
 * for another bot by the same maker under a raffle's winners, promo.ts) on or
 * off. /privacy: what they do, then the shared privacy policy. In groups, like
 * Randy's other commands, both answer only admins (a member's command is
 * deleted with no reply).
 * @param bot Bot to setup the commands
 */
export function setupPromos(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('promos', async (ctx) => {
    if (!(await checkIfAdmin(ctx))) return
    const chat = await findChat(ctx.chat.id)
    const reply = (key: string) =>
      ctx.reply(loc(key, chat.language), { disable_notification: true })
    if (chatKind(ctx.chat.type) !== 'group') return reply('promos_group_only')
    const want = ((ctx.message && ctx.message.text) || '')
      .trim()
      .split(/\s+/)[1]
    const arg = (want || '').toLowerCase()
    if (arg !== 'on' && arg !== 'off') {
      const on = await promo.groupOn(ctx.chat.id)
      return reply(
        on === undefined
          ? 'promos_error'
          : on
          ? 'promos_status_on'
          : 'promos_status_off'
      )
    }
    return reply(
      (await promo.setGroup(ctx.chat.id, arg === 'on'))
        ? arg === 'on'
          ? 'promos_on'
          : 'promos_off'
        : 'promos_error'
    )
  })
  bot.command('privacy', async (ctx) => {
    if (!(await checkIfAdmin(ctx))) return
    const chat = await findChat(ctx.chat.id)
    return ctx.reply(
      `${loc('promos_privacy', chat.language)}\n\nhttps://privacy.borodutch.com`,
      // the typings miss disable_web_page_preview on replies
      { disable_notification: true, disable_web_page_preview: true } as any
    )
  })
}
