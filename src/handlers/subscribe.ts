import { ContextMessageUpdate, Telegraf } from 'telegraf'
import { findChat } from '../models/Chat'
import { getChatIdForConfig } from '../helpers/getChatIdForConfig'
import { loc } from '../helpers/locale'

export function setupSubscribe(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('subscribe', async (ctx) => {
    // Get chat id
    const chatId = await getChatIdForConfig(ctx)
    if (!chatId) {
      return
    }
    // Get chat
    const chat = await findChat(chatId)
    // Check format
    const subscribeStringTemp = (ctx.message || ctx.channelPost).text
      .substr(11)
      .trim()
      .replace(/@/g, '')
    if (!subscribeStringTemp) {
      return ctx.reply(loc('subscribe_format', chat.language), {
        disable_notification: true,
        parse_mode: 'Markdown',
      } as any)
    }
    // Check if bot is admin in this chat
    try {
      let isBotAdmin = ctx.chat.type === 'private'
      if (!isBotAdmin) {
        const chatAdmins = await ctx.getChatAdministrators()
        isBotAdmin = chatAdmins
          .map((m) => m.user.username)
          .includes(bot.options.username)
      }
      if (!isBotAdmin) {
        throw new Error()
      }
    } catch (err) {
      return ctx.reply(loc('bot_not_admin', chat.language), {
        disable_notification: true,
      })
    }
    const subscribeStrings = subscribeStringTemp.split(',').map((s) => s.trim())
    for (const subscribeString of subscribeStrings) {
      // Check if bot is admin in subscribe chat
      try {
        const subscribeChatAdmins = await ctx.telegram.getChatAdministrators(
          `${!isNaN(+subscribeString) ? '' : '@'}${subscribeString}`
        )
        const isBotAdmin = subscribeChatAdmins
          .map((m) => m.user.username)
          .includes(bot.options.username)
        if (!isBotAdmin) {
          throw new Error()
        }
      } catch (err) {
        return ctx.reply(
          `${loc('bot_not_admin_chat', chat.language)}${subscribeStrings
            .map((s) => `${!isNaN(+s) ? '' : '@'}${s}`)
            .join(', ')}`,
          {
            disable_notification: true,
          }
        )
      }
    }
    // Add subscibe string
    chat.subscribe = subscribeStrings.join(',')
    await chat.save()
    // Report success
    return ctx.reply(
      `${loc('subscribe_success', chat.language)}${subscribeStrings
        .map((s) => `${!isNaN(+s) ? '' : '@'}${s}`)
        .join(', ')}`,
      {
        disable_notification: true,
      }
    )
  })
}
