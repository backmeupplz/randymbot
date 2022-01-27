import Context from '@/models/Context'

export default function onlyKickedOrRemovedAdminMe(ctx: Context) {
  if (!ctx.myChatMember) {
    throw new Error('ChatMemberUpdated is undefined')
  }

  const oldInformationAboutMe = ctx.myChatMember.old_chat_member
  const newInformationAboutMe = ctx.myChatMember.new_chat_member

  if (['left', 'kicked'].includes(newInformationAboutMe.status)) {
    return true
  }

  if (
    newInformationAboutMe.status === 'member' &&
    oldInformationAboutMe.status === 'administrator'
  ) {
    return true
  }

  if (
    newInformationAboutMe.status === 'administrator' &&
    (!newInformationAboutMe.can_delete_messages ||
      !newInformationAboutMe.can_post_messages ||
      !newInformationAboutMe.can_edit_messages)
  ) {
    return true
  }

  return false
}
