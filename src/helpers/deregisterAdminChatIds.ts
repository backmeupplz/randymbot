import { findChat } from '@/models/Chat'
import Context from '@/models/Context'

export default async function deregisterAdminChatIds(ctx: Context) {
  if (!ctx.chat) return

  const foundChat = await findChat(ctx.chat.id)
  const creatorId = foundChat?.creatorId

  if (!creatorId) return

  const foundCreator = await findChat(creatorId)

  if (!foundCreator) return

  foundCreator.adminChatIds = foundCreator.adminChatIds.filter(
    (chatId) => chatId !== ctx.chat?.id
  )

  if (foundCreator.editedChatId === ctx.chat.id) {
    foundCreator.editedChatId = undefined
    await foundCreator.save()
  }

  console.log('Я тут!')
  return foundCreator.save()
}
