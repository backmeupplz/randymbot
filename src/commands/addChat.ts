import { findChat } from '../models/chat'
import { ContextMessageUpdate, Telegraf } from 'telegraf'
import { loc } from '../helpers/locale'

export function setupAddChat(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('addChat', async (ctx) => {
    // Check if private
    if (ctx.message.chat.type !== 'private') {
      return
    }
    // Get randy
    const randy = await ctx.telegram.getMe()
    const thisChat = await findChat(ctx.chat.id)
    // Get chat id
    let chatId: string | number = ctx.message.text.split(' ')[1]
    if (!chatId) {
      return
    }
    if (!isNaN(+chatId)) {
      chatId = +chatId
    }
    // Check if randy is an admin there
    const randyMember = await ctx.telegram.getChatMember(chatId, randy.id)
    if (randyMember.status !== 'administrator') {
      return ctx.reply(loc('bot_not_admin_chat', thisChat.language))
    }
    // Check if user is administrator in that chat
    const chatMember = await ctx.telegram.getChatMember(chatId, ctx.from.id)
    if (!['administrator', 'creator'].includes(chatMember.status)) {
      return ctx.reply(loc('mustBeAnAdmin', thisChat.language))
    }
    // Add that chat to user's admin privelege
    const gotChat = await ctx.telegram.getChat(chatId)
    if (!thisChat.adminChatIds.includes(gotChat.id)) {
      thisChat.adminChatIds.push(gotChat.id)
    }
    await thisChat.save()
    // Reply with success
    return ctx.reply(loc('config_raffle_instructions', thisChat.language))
  })
}
