import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import {
  ignoreOld,
  onlyAdmin,
  onlyPublic,
  onlySuperAdmin,
  sequentialize,
} from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import attachChat from '@/middlewares/attachChat'
import bot from '@/helpers/bot'
import checkReplyMessageId from '@/filters/checkReplyMessageId'
import configureI18n from '@/middlewares/configureI18n'
import env from '@/helpers/env'
import handleCheckSubscription from '@/handlers/checkSubscription'
import handleCustomWinnerMessage from '@/handlers/winnerMessage'
import handleDebug from '@/handlers/debug'
import handleDelete from '@/handlers/delete'
import handleHelp from '@/handlers/help'
import handleId from '@/handlers/id'
import handleKeepRaffleMessage from '@/handlers/keepRaffleMessage'
import handleLanguage from '@/handlers/language'
import handleNoCustomRaffleMessage from '@/handlers/noCustomRaffleMessage'
import handleNoCustomWinnerMessage from '@/handlers/noCustomWinnerMessage'
import handleNumberOfWinners from '@/handlers/numberOfWinners'
import handleRandy from '@/handlers/randy'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import numberOfWinnersMenu from '@/menus/numberOfWinners'
import onlyAdminErrorHandler from '@/helpers/onlyAdminErrorHandler'
import onlyMessageWithParameters from '@/filters/onlyMessageWithParameters'
import onlyRepliesToBots from '@/filters/onlyRepliesToBots'
import saveWinnerMessage from '@/helpers/saveWinnerMessage'
import startMessageDeleter from '@/helpers/messageDeleter'
import startMongo from '@/helpers/startMongo'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.info('Mongo connected')
  bot
    // Middlewares
    .use(sequentialize())
    .use(ignoreOld())
    .use(attachChat)
    .use(i18n.middleware())
    .use(configureI18n)
    // Menus
    .use(languageMenu)
    .use(numberOfWinnersMenu)
    // Extra middleware
    .use(onlyAdmin(onlyAdminErrorHandler))
  // Commands
  bot.command(['help', 'start'], handleHelp)
  bot.command('language', handleLanguage)
  bot.command('randy', onlyPublic(), handleRandy)
  bot.command('numberOfWinners', handleNumberOfWinners)
  bot.command('id', handleId)
  bot.command('keepRaffleMessage', handleKeepRaffleMessage)
  bot.command('noCustomRaffleMessage', handleNoCustomRaffleMessage)
  bot.command('noCustomWinnerMessage', handleNoCustomWinnerMessage)
  bot.command('customWinnerMessage', handleCustomWinnerMessage)
  bot.command('checkSubscription', handleCheckSubscription)
  // Super admin commands
  const superAdmin = bot.use(onlySuperAdmin(env.SUPER_ADMIN_ID))
  superAdmin.command('debug', handleDebug)
  superAdmin.command('delete', handleDelete)
  // On message
  bot
    .on('message')
    .filter(onlyRepliesToBots)
    .filter(checkReplyMessageId)
    .filter(onlyMessageWithParameters, saveWinnerMessage)
  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
  // Start message deleter
  startMessageDeleter()
  console.info('Message deleter started')
}

void runApp()

// // Setup callback
// setupCallback(bot)
// // Setup listeners
// setupListener(bot)
// setupListenForForwards(bot)

// // Setup commands
// setupRaffleMessage(bot)
// setupWinnerMessage(bot)
// setupConfigRaffle(bot)
// setupAddChat(bot)
