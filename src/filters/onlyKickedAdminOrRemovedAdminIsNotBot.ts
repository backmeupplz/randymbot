import Context from '@/models/Context'

export default function onlyKickedAdminOrRemovedAdminIsNotBot(ctx: Context) {
  if (!ctx.chatMember) {
    throw new Error('ChatMemberUpdated is undefined')
  }

  const oldStatusKickedOrLeftMember = ctx.chatMember.old_chat_member.status
  const newStatusKickedOrLeftMember = ctx.chatMember.new_chat_member.status
  const isBot = ctx.chatMember.new_chat_member.user.is_bot

  if (isBot) {
    return false
  }

  if (
    ['administrator'].includes(oldStatusKickedOrLeftMember) &&
    ['left', 'kicked'].includes(newStatusKickedOrLeftMember)
  ) {
    return true
  }

  if (
    oldStatusKickedOrLeftMember === 'administrator' &&
    newStatusKickedOrLeftMember === 'member'
  ) {
    return true
  }

  return false
}
