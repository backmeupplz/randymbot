// import { ContextMessageUpdate } from 'telegraf'

// /**
//  * Checking if user is admin at chat, deletes message if not
//  * @param ctx Context of the message
//  * @param shouldDelete If the message shouldbe deleted
//  * @returns true if the user is admin
//  */
// export async function checkIfAdmin(
//   ctx: ContextMessageUpdate,
//   shouldDelete: boolean = true
// ) {
//   try {
//     if (ctx.from && ctx.from.id === parseInt(process.env.ADMIN, 10)) {
//       return true
//     }
//     if (
//       ctx.from &&
//       ctx.from.username &&
//       ctx.from.username === 'GroupAnonymousBot'
//     ) {
//       return true
//     }
//     // Channel and private are always true
//     if (['channel', 'private'].indexOf(ctx.chat.type) > -1) return true
//     // Check if admin
//     const member = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)
//     const isAdmin = ['administrator', 'creator'].includes(member.status)
//     // Delete message if not admin
//     if (!isAdmin) {
//       try {
//         if (shouldDelete) {
//           await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
//         }
//       } catch (err) {
//         // Do nothing
//       }
//     }
//     // Return result
//     return isAdmin
//   } catch (err) {
//     console.log(err)
//     // Delete message
//     try {
//       if (shouldDelete) {
//         await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
//       }
//     } catch (err) {
//       // Do nothing
//     }
//     // In case if something goes wrong
//     return false
//   }
// }
