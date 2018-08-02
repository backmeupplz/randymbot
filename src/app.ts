// Get environment variables
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })

// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'
import { setupStartAndHelp } from './commands/startAndHelp'
import { setupRandy } from './commands/randy'
import { setupCallback } from './helpers/raffle'
const telegraf = require('telegraf')

// Setup the bot
const bot: Telegraf<ContextMessageUpdate> = new telegraf(process.env.TOKEN, { username: process.env.USERNAME })
bot.startPolling()

// Setup commands
setupStartAndHelp(bot)
setupRandy(bot)

// Setup callbacks
setupCallback(bot)