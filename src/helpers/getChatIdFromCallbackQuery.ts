import Context from '@/models/Context'

export default function getChatIdFromCallbackQuery(ctx: Context) {
  const chatId = Number(ctx.callbackQuery?.data?.replace('chat:', ''))

  if (isNaN(chatId)) {
    throw new Error('No chat id in callback query')
  }

  return chatId
}
