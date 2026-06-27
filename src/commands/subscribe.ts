import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'
import { getChatIdForConfig } from '../helpers/getChatIdForConfig'
import {
  formatChannelHandles,
  markdownishToTelegramHtml,
  replyWithHtml,
} from '../helpers/telegramHtml'

export function setupSubscribe(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('subscribe', async (ctx) => {
    // Get chat id
    const chatId = await getChatIdForConfig(ctx)
    if (!chatId) {
      return
    }
    // Get chat
    let chat = await findChat(chatId)
    // Check format
    const subscribeStringTemp = (ctx.message || ctx.channelPost).text
      .substr(11)
      .trim()
      .replace(/@/g, '')
    if (!subscribeStringTemp) {
      return replyWithHtml(
        ctx,
        markdownishToTelegramHtml(loc('subscribe_format', chat.language)),
        {
          disable_notification: true,
        }
      )
    }
    // Check if bot is admin in this chat
    try {
      let isBotAdmin = ctx.chat.type === 'private'
      if (!isBotAdmin) {
        const chatAdmins = await ctx.getChatAdministrators()
        isBotAdmin = chatAdmins
          .map((m: any) => m.user.username)
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
    const subscribeStrings: string[] = subscribeStringTemp
      .split(',')
      .map((s: string) => s.trim())
    for (const subscribeString of subscribeStrings) {
      // Check if bot is admin in subscribe chat
      try {
        const subscribeChatAdmins = await ctx.telegram.getChatAdministrators(
          `${!isNaN(+subscribeString) ? '' : '@'}${subscribeString}`
        )
        const isBotAdmin = subscribeChatAdmins
          .map((m: any) => m.user.username)
          .includes(bot.options.username)
        if (!isBotAdmin) {
          throw new Error()
        }
      } catch (err) {
        return replyWithHtml(
          ctx,
          `${markdownishToTelegramHtml(loc('bot_not_admin_chat', chat.language))}${formatChannelHandles(
            subscribeStrings
          )}`,
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
    return replyWithHtml(
      ctx,
      `${markdownishToTelegramHtml(loc('subscribe_success', chat.language))}${formatChannelHandles(
        subscribeStrings
      )}`,
      {
        disable_notification: true,
      }
    )
  })
}
