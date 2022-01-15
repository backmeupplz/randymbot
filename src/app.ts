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
import { matchFilter } from 'grammy'
import { run } from '@grammyjs/runner'
import addAdminChatIds from '@/helpers/addAdminChatIds'
import attachChat from '@/middlewares/attachChat'
import bot from '@/helpers/bot'
import checkEditedChatId from '@/middlewares/checkEditedChatId'
import configureI18n from '@/middlewares/configureI18n'
import deregisterAdminChatIds from '@/helpers/deregisterAdminChatIds'
import env from '@/helpers/env'
import gotKickedMe from '@/filters/gotKickedMe'
import handleAddChat from '@/handlers/addChat'
import handleCheckSubscription from '@/handlers/checkSubscription'
import handleConfigRaffle from '@/handlers/configRaffle'
import handleCustomRaffleMessage from '@/handlers/raffleMessage'
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
import onlyRepliesToRaffleMessageSetupMessage from '@/filters/onlyRepliesToRaffleMessageSetupMessage'
import onlyRepliesToWinnerMessageSetupMessage from '@/filters/onlyRepliesToWinnerMessageSetupMessage'
import saveRaffleMessage from '@/helpers/saveRaffleMessage'
import saveWinnerMessage from '@/helpers/saveWinnerMessage'
import setEditedChat from '@/helpers/setEditedChat'
import startMessageDeleter from '@/helpers/messageDeleter'
import startMongo from '@/helpers/startMongo'
import statusEqAdm from '@/filters/statusEqAdm'

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
    .filter(matchFilter('my_chat_member'))
    .filter(statusEqAdm, addAdminChatIds)

  // Bot is excluded from a group or channel
  bot.on('my_chat_member').filter(gotKickedMe, deregisterAdminChatIds)

  bot
    // Middlewares
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
  bot.command('numberOfWinners', checkEditedChatId, handleNumberOfWinners)
  bot.command('id', handleId)
  bot.command('keepRaffleMessage', checkEditedChatId, handleKeepRaffleMessage)
  bot.command(
    'noCustomRaffleMessage',
    checkEditedChatId,
    handleNoCustomRaffleMessage
  )
  bot.command('noCustomWinnerMessage', handleNoCustomWinnerMessage)
  bot.command(
    'customWinnerMessage',
    checkEditedChatId,
    handleCustomWinnerMessage
  )
  bot.command(
    'customRaffleMessage',
    checkEditedChatId,
    handleCustomRaffleMessage
  )
  bot.command('checkSubscription', checkEditedChatId, handleCheckSubscription)
  bot.command('addChat', handleAddChat)
  bot.command('chooseChannelToConfigure', handleConfigRaffle)

  // On message winnerMessage
  bot
    .on('msg')
    .filter(onlyRepliesToBots)
    .filter(onlyRepliesToWinnerMessageSetupMessage)
    .filter(
      onlyMessageWithParameters(['$numberOfParticipants', '$winner']),
      saveWinnerMessage
    )

  // On message raffleMessage
  bot
    .on('msg')
    .filter(onlyRepliesToBots)
    .filter(onlyRepliesToRaffleMessageSetupMessage)
    .filter(
      onlyMessageWithParameters(['$numberOfParticipants']),
      saveRaffleMessage
    )

  // Super admin commands
  const superAdmin = bot.use(onlySuperAdmin(env.SUPER_ADMIN_ID))
  superAdmin.command('debug', handleDebug)
  superAdmin.command('delete', handleDelete)

  //
  bot.callbackQuery(/chat:.+/, setEditedChat)

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
