import { ContextMessageUpdate, Telegraf } from 'telegraf'
import { findChat } from '../models/Chat'
import { loc } from '../helpers/locale'

export function setupConfigRaffle(bot: Telegraf<ContextMessageUpdate>) {
  bot.command('configRaffle', async (ctx) => {
    // Check if private
    if (ctx.chat.type !== 'private') {
      return
    }
    // Get chat
    const chat = await findChat(ctx.chat.id)
    // Check if there is a choice
    if (!chat.adminChatIds.length) {
      return ctx.reply(loc('config_raffle_no_chats', chat.language))
    }
    // Add choices
    const editedChats = (
      await Promise.all(
        chat.adminChatIds.map(async (id) => {
          try {
            const edittedChat = await ctx.telegram.getChat(id)
            return edittedChat
          } catch {
            return undefined
          }
        })
      )
    ).filter((v) => !!v)
    const options = editedChats.map((c) => [
      {
        text: c.title,
        callback_data: `c~${c.id}`,
      },
    ])
    options.push([
      {
        text: loc('private_messages', chat.language),
        callback_data: 'this_chat',
      },
    ])
    // Send chat selection
    ctx.reply(loc('select_chat', chat.language), {
      reply_markup: {
        inline_keyboard: options,
      },
    })
  })

  bot.action('this_chat', async (ctx) => {
    try {
      await ctx.answerCbQuery()
    } catch (err) {
      try {
        await ctx.deleteMessage()
      } catch {
        // Do nothing
      }
    }
    const chat = await findChat(ctx.chat.id)
    chat.editedChatId = undefined
    await chat.save()
    return ctx.reply(loc('now_editing_this_chat', chat.language))
  })

  bot.action(/c~.+/, async (ctx) => {
    try {
      await ctx.answerCbQuery()
    } catch (err) {
      try {
        await ctx.deleteMessage()
      } catch {
        // Do nothing
      }
    }
    // Get this chat
    const chat = await findChat(ctx.chat.id)
    // Get the edited chat
    const editedChatId = +ctx.callbackQuery.data.substr(2)
    const editedChat = await ctx.telegram.getChat(editedChatId)
    // Get this user from the edited chat
    const userFromChat = await ctx.telegram.getChatMember(
      editedChatId,
      ctx.from.id
    )
    // Check if user is an admin
    if (!['creator', 'administrator'].includes(userFromChat.status)) {
      await ctx.deleteMessage()
      return ctx.reply(loc('mustBeAnAdmin', chat.language))
    }
    // Set edited chat
    chat.editedChatId = editedChat.id
    await chat.save()
    return ctx.reply(
      `${loc('now_editing_this_chat', chat.language)}: ${editedChat.title}`
    )
  })
}
