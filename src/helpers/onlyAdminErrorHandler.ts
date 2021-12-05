import { MessageToDeleteModel } from '@/models/MessageToDelete'
import Context from '@/models/Context'

export default async function onlyAdminErrorHandler(ctx: Context) {
  const sentMessage = await ctx.reply(ctx.i18n.t('only_admin_error'), {
    reply_to_message_id: ctx.msg?.message_id,
  })
  await MessageToDeleteModel.create({
    messageId: sentMessage.message_id,
    chatId: ctx.dbchat.id,
    deleteInSeconds: 60,
  })
  if (ctx.msg?.message_id) {
    await MessageToDeleteModel.create({
      messageId: ctx.msg.message_id,
      chatId: ctx.dbchat.id,
      deleteInSeconds: 60,
    })
  }
}
