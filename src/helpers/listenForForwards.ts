import { findChat } from '../models/chat'
import { ContextMessageUpdate, Telegraf } from 'telegraf'
import { loc } from '../helpers/locale'

export function setupListenForForwards(bot: Telegraf<ContextMessageUpdate>) {
  bot.use(async (ctx, next) => {
    // Check if private
    if (ctx.message?.chat.type !== 'private') {
      return next()
    }
    // Check if forward
    const chatId = ctx.message?.forward_from_chat.id
    if (!chatId) {
      return next()
    }
    // Check if not a forward from the same chat
    if (ctx.chat?.id === chatId) {
      return next()
    }
    // Check if forward from a channel or group
    if (
      !['group', 'supergroup', 'channel'].includes(
        ctx.message?.forward_from_chat.type
      )
    ) {
      return next()
    }
    // Get randy
    const randy = await ctx.telegram.getMe()
    const thisChat = await findChat(ctx.chat.id)
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
    thisChat.adminChatIds.push(chatId)
    await thisChat.save()
    // Reply with success
    return ctx.reply(loc('config_raffle_instructions', thisChat.language))
  })
}
