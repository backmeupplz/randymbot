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
import { pollWithHandover } from './helpers/handover'
import { promo } from './helpers/promoBot'
const telegraf = require('telegraf')

// Setup the bot
const bot: Telegraf<ContextMessageUpdate> = new telegraf(process.env.TOKEN, {
  username: process.env.USERNAME,
  channelMode: true,
})
// The newest update fetched and the handlers still running, for handing polling over on deploys
let lastUpdate = 0
let handling = 0
let stopping = false
bot.use((ctx, next) => {
  lastUpdate = Math.max(lastUpdate, ctx.update.update_id)
  handling++
  return next().finally(() => handling--)
})
// Cross-promo measurement (helpers/promo.ts): a private chat blocking Randy is
// the harm check; adding Randy to a group counts as use for people another
// bot's campaign brought here
const ACTIVE = ['member', 'administrator', 'creator']
bot.use((ctx, next) => {
  const m = (ctx.update as any).my_chat_member
  if (m && m.chat.type === 'private' && m.new_chat_member.status === 'kicked')
    promo.blocked(m.from.id)
  else if (
    m &&
    m.chat.type !== 'private' &&
    ACTIVE.includes(m.new_chat_member.status) &&
    !ACTIVE.includes(m.old_chat_member.status)
  )
    void promo.used(m.from.id)
  return next()
})
// Updates Randy asks for, my_chat_member included (Telegram keeps the last list)
const ALLOWED_UPDATES = [
  'message',
  'edited_message',
  'channel_post',
  'edited_channel_post',
  'callback_query',
  'my_chat_member',
]

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
  if (
    !ctx.chat ||
    !ctx.chat.type ||
    ctx.chat.type !== 'private' ||
    !ctx.message ||
    !ctx.message.forward_from_chat
  ) {
    return
  }
  if (ctx.from.id !== 76104711) {
    const chatMember = await ctx.telegram.getChatMember(
      ctx.message.forward_from_chat.id,
      ctx.from.id
    )
    if (
      chatMember.status !== 'creator' &&
      chatMember.status !== 'administrator'
    ) {
      return
    }
  }
  const raffle = await RaffleModel.findOne({
    chatId: ctx.message.forward_from_chat.id,
    messageId: ctx.message.forward_from_message_id,
  })
  if (!raffle) {
    return
  }
  try {
    let numberOfTries = 0
    let succeeded = false
    while (numberOfTries < 100 && !succeeded) {
      try {
        await finishRaffle(
          raffle,
          ctx,
          await findChat(ctx.message.forward_from_chat.id)
        )
        succeeded = true
      } catch (e) {
        console.log(e)
        numberOfTries++
        if (numberOfTries === 100) {
          throw e
        }
      }
    }
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

pollWithHandover(
  () => {
    // Telegraf 3 stops polling for good on 401/409 from getUpdates and the process
    // then exits 0, which Swarm (restart on-failure) treats as done. Exit 1 instead.
    // (the typings omit the stopCallback argument)
    ;(bot as any).startPolling(30, 100, ALLOWED_UPDATES, () => {
      if (stopping) return
      console.error('Polling stopped, exiting so the bot gets restarted')
      process.exit(1)
    })
    promo.start()
    console.log('Bot is up and running')
  },
  async () => {
    stopping = true
    bot.stop()
    // Telegraf 3 cannot abort its long poll: a zero-timeout getUpdates ends it
    // and confirms every update fetched, so the next poller does not get them again
    await (bot.telegram as any).getUpdates(0, 1, lastUpdate + 1, undefined)
  },
  async () => {
    while (handling) await new Promise((resolve) => setTimeout(resolve, 100))
    await promo.stop()
  }
)

process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection at:', reason)
})

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught exception:', err)
})
