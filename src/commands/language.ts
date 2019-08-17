// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { checkIfAdmin } from '../helpers/checkAdmin'
import { findChat } from '../models/chat'
import { loc } from '../helpers/locale'

/**
 * Setting up the language command
 * @param bot Bot to setup the command
 */
export function setupLanguage(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('language', async (ctx) => {
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx)
    if (!isAdmin) return
    // Get chat
    const chat = await findChat(ctx.chat.id)
    // Reply
    ctx.reply(loc('select_language', chat.language), {
      reply_markup: getButtons()
    })
  })
}

/**
 * Setting up callback for the language keyboard
 * @param bot Bot to setup the callback
 */
export function setupLanguageCallback(bot: Telegraf<ContextMessageUpdate>) {
  (<any>bot).action(async (data: string, ctx: ContextMessageUpdate) => {
    // Get raffle
    const datas = data.split('~')
    if (datas[0] !== 'l') return;
    // Check if admin
    const isAdmin = await checkIfAdmin(ctx, false)
    if (!isAdmin) return
    // Get chat
    let chat = await findChat(ctx.chat.id)
    // Save language
    chat.language = datas[1]
    chat = await chat.save()
    // Update message
    await ctx.telegram.editMessageText(ctx.chat.id, (<any>ctx).update.callback_query.message.message_id, undefined, loc('language_selected', chat.language))
  })
}

/**
 * Language keyboard
 * @returns language keyboard
 */
function getButtons() {
  return {
    inline_keyboard: [
      [{
        text: 'English',
        callback_data: `l~en`,
      }],
      [{
        text: 'Русский',
        callback_data: `l~ru`,
      }],
       [{
        text: 'Português',
        callback_data: `l~pt`,
      }],
      [{
        text: 'Turkce',
        callback_data: `l~tr`,
      }],
      [{
        text: 'Українська',
        callback_data: `l~uk`,
      }],
    ],
  }
}
