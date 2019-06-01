import { ContextMessageUpdate, Telegraf } from 'telegraf'

/**
 * Checking if user is admin at chat, deletes message if not
 * @param ctx Context of the message
 * @param shouldDelete If the message shouldbe deleted
 * @returns true if the user is admin
 */
export async function checkIfAdmin(
  ctx: ContextMessageUpdate,
  shouldDelete: boolean = true
) {
  try {
    if (ctx.from.id === parseInt(process.env.ADMIN, 10)) {
      return true
    }
    // Channel and private are always true
    if (['channel', 'private'].indexOf(ctx.chat.type) > -1) return true
    // Check if admin
    const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id)
    const adminsIds = admins.map(admin => admin.user.id)
    const isAdmin = adminsIds.indexOf(ctx.from.id) > -1
    // Delete message if not admin
    if (!isAdmin) {
      try {
        if (shouldDelete) {
          await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
        }
      } catch (err) {
        // Do nothing
      }
    }
    // Return result
    return isAdmin
  } catch (err) {
    // Delete message
    try {
      if (shouldDelete) {
        await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
      }
    } catch (err) {
      // Do nothing
    }
    // In case if something goes wrong
    return false
  }
}
