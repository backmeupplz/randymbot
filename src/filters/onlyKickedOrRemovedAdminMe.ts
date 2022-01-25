import Context from '@/models/Context'

export default function onlyKickedOrRemovedAdminMe(ctx: Context) {
  if (!ctx.myChatMember) {
    throw new Error('ChatMemberUpdated is undefined')
  }

  const myOldInf = ctx.myChatMember.old_chat_member
  const myNewInf = ctx.myChatMember.new_chat_member

  if (['left', 'kicked'].includes(myNewInf.status)) {
    return true
  }

  if (myNewInf.status === 'member' && myOldInf.status === 'administrator') {
    return true
  }

  if (
    myNewInf.status === 'administrator' &&
    (!myNewInf.can_delete_messages ||
      !myNewInf.can_post_messages ||
      !myNewInf.can_edit_messages)
  ) {
    return true
  }

  return false
}
