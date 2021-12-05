import { MessageToDeleteModel } from '@/models/MessageToDelete'
import bot from '@/helpers/bot'

let checking = false
async function checkAndDeleteMessages() {
  if (checking) {
    return
  }
  checking = true
  try {
    const messages = await MessageToDeleteModel.find()
    for (const message of messages) {
      if (
        (Date.now() - message.createdAt.getTime()) / 1000 >
        message.deleteInSeconds
      ) {
        try {
          await bot.api.deleteMessage(message.chatId, message.messageId)
        } catch {
          // Do nothing
        }
        await message.remove()
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    checking = false
  }
}

export default function startMessageDeleter() {
  setInterval(checkAndDeleteMessages, 5 * 1000)
}
