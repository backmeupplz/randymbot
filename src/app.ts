import 'module-alias/register'

import 'source-map-support/register'

import {
  ignoreOld,
  onlyAdmin,
  onlyPublic,
  sequentialize,
} from 'grammy-middlewares'
import { localeActions, sendLanguage, setLanguage } from '@/commands/language'
import { run } from '@grammyjs/runner'
import attachChat from '@/middlewares/attachChat'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import handleHelp from '@/commands/handleHelp'
import handleRandy from '@/commands/randy'
import i18n from '@/helpers/i18n'
import onlyAdminErrorHandler from '@/helpers/onlyAdminErrorHandler'
import startMongo from '@/helpers/startMongo'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')
  // Middlewares
  bot.use(sequentialize())
  bot.use(ignoreOld())
  bot.use(attachChat)
  bot.use(i18n.middleware())
  bot.use(configureI18n)
  // Commands
  bot.command(['help', 'start'], handleHelp)
  bot.command('language', sendLanguage)
  bot.command(
    'randy',
    onlyPublic(),
    onlyAdmin(onlyAdminErrorHandler),
    handleRandy
  )
  // Actions
  bot.callbackQuery(localeActions, setLanguage)
  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()

// // Setup callback
// setupCallback(bot)
// // Setup listeners
// setupListener(bot)
// setupListenForForwards(bot)

// // Setup commands
// setupStartAndHelp(bot)
// setupRandy(bot)
// setupLanguage(bot)
// setupNumber(bot)
// setupTestLocale(bot)
// setupSubscribe(bot)
// setupNosubscribe(bot)
// setupRaffleMessage(bot)
// setupWinnerMessage(bot)
// setupNodelete(bot)
// setupConfigRaffle(bot)
// setupAddChat(bot)
// setupId(bot)
// setupDebug(bot)

// // Setup callbacks
// setupLanguageCallback(bot)
// setupNumberCallback(bot)

// bot.catch(console.error)
