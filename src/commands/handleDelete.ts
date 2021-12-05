import Context from '@/models/Context'

export default async function handleDelete(ctx: Context) {
  if (ctx.chat?.id && ctx.message?.reply_to_message?.message_id) {
    await ctx.api.deleteMessage(
      ctx.chat?.id,
      ctx.message.reply_to_message?.message_id
    )
  }
  return ctx.deleteMessage()
}
