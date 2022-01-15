import { ChatFromGetChat } from 'grammy/out/platform.node'
import { findOrCreateChat } from '@/models/Chat'
import Context from '@/models/Context'

export default async function handleAddChat(ctx: Context) {
  if (!ctx.match || ctx.chat?.type !== 'private') {
    return
  }

  let chat: ChatFromGetChat

  if (ctx.match.includes('@')) {
    chat = await ctx.api.getChat(`${ctx.match}`)
  } else {
    chat = await ctx.api.getChat(`-${ctx.match}`)
  }

  const chatMember = await ctx.api.getChatMember(chat.id, ctx.me.id)

  if (chatMember.status !== 'administrator') {
    await ctx.replyWithLocalization('bot_not_admin_chat')
    return
  }

  if (!ctx.dbchat.adminChatIds.includes(chat.id)) {
    ctx.dbchat.adminChatIds.push(chat.id)
    await ctx.dbchat.save()
    await findOrCreateChat(chat.id)
  }

  return ctx.replyWithLocalization('config_raffle_instructions')
}
