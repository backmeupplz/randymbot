// import { ContextMessageUpdate } from 'telegraf'

// export async function checkIfAdminInChat(
//   ctx: ContextMessageUpdate,
//   userId: number,
//   chatId: number
// ) {
//   try {
//     const member = await ctx.telegram.getChatMember(chatId, userId)
//     return ['administrator', 'creator'].includes(member.status)
//   } catch {
//     return false
//   }
// }
