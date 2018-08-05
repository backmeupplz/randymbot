// Get environment variables
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })

// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { setupStartAndHelp } from './commands/startAndHelp'
import { setupRandy } from './commands/randy'
import { setupCallback, setupListener } from './helpers/raffle'
import { setupLanguage, setupLanguageCallback } from './commands/language'
const telegraf = require('telegraf')

// Setup the bot
const bot: Telegraf<ContextMessageUpdate> = new telegraf(process.env.TOKEN, {
  username: process.env.USERNAME,
  channelMode: true,
})
bot.startPolling()

// Setup listener
setupListener(bot)

// Setup commands
setupStartAndHelp(bot)
setupRandy(bot)
setupLanguage(bot)

// Setup callbacks
setupCallback(bot)
setupLanguageCallback(bot)