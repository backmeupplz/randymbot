// Get environment variables
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })

// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { setupStartAndHelp } from './commands/startAndHelp'
import { setupRandy } from './commands/randy'
import { finishRaffle, setupCallback, setupListener } from './helpers/raffle'
import { setupLanguage, setupLanguageCallback } from './commands/language'
import { setupNumberCallback, setupNumber } from './commands/number'
import { setupTestLocale } from './commands/testLocales'
import { setupSubscribe } from './commands/subscribe'
import { setupNosubscribe } from './commands/nosubscribe'
import { setupRaffleMessage } from './commands/raffleMessage'
import { setupWinnerMessage } from './commands/winnerMessage'
import { setupNodelete } from './commands/nodelete'
import { setupListenForForwards } from './helpers/listenForForwards'
import { setupConfigRaffle } from './commands/configRaffle'
import { setupAddChat } from './commands/addChat'
import { setupId } from './commands/id'
import { setupDebug } from './commands/debug'
import { RaffleModel } from './models'
import { findChat } from './models/chat'
const telegraf = require('telegraf')

// Setup the bot
const bot: Telegraf<ContextMessageUpdate> = new telegraf(process.env.TOKEN, {
  username: process.env.USERNAME,
  channelMode: true,
})
bot.startPolling()
console.log('Bot is up and running')

// Setup callback
setupCallback(bot)
// Setup listeners
setupListener(bot)
setupListenForForwards(bot)

// Setup commands
setupStartAndHelp(bot)
setupRandy(bot)
setupLanguage(bot)
setupNumber(bot)
setupTestLocale(bot)
setupSubscribe(bot)
setupNosubscribe(bot)
setupRaffleMessage(bot)
setupWinnerMessage(bot)
setupNodelete(bot)
setupConfigRaffle(bot)
setupAddChat(bot)
setupId(bot)
setupDebug(bot)
bot.on('message', async (ctx) => {
  if (!ctx.chat || !ctx.chat.type || ctx.chat.type !== 'private' || !ctx.message || !ctx.message.forward_from_chat || ctx.message.forward_from_chat.type !== 'channel') {
    return
  }
  const chatMember = await ctx.telegram.getChatMember(ctx.message.forward_from_chat.id, ctx.from.id)
  if (chatMember.status !== 'creator' && chatMember.status !== 'administrator') {
    return
  }
  const raffle = await RaffleModel.findOne({ chatId: ctx.message.forward_from_chat.id, messageId: ctx.message.forward_from_message_id })
  if (!raffle) {
    return
  }
  try {
    await finishRaffle(raffle, ctx, await findChat(ctx.message.forward_from_chat.id))
    await ctx.reply('👍', {
      reply_to_message_id: ctx.message.message_id,
    })
  } catch (err) {
    console.error(err)
    await ctx.reply('👎 try again', {
      reply_to_message_id: ctx.message.message_id,
    })
  }
})

// Setup callbacks
setupLanguageCallback(bot)
setupNumberCallback(bot)

bot.catch(console.error)

process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection at:', reason)
})
