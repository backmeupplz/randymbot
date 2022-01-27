import Context from '@/models/Context'

export default function onlyIfGotEnoughPermissions(ctx: Context) {
  if (!ctx.chat || !ctx.myChatMember) {
    throw new Error('Chat or ChatMemberUpdated is undefined')
  }

  const newInformationAboutMe = ctx.myChatMember.new_chat_member

  if (newInformationAboutMe.status !== 'administrator') {
    return false
  }

  if (['group', 'supergroup'].includes(ctx.chat.type)) {
    return newInformationAboutMe.can_delete_messages
  }

  if (['channel'].includes(ctx.chat.type)) {
    return (
      newInformationAboutMe.can_delete_messages &&
      !!newInformationAboutMe.can_post_messages &&
      !!newInformationAboutMe.can_edit_messages
    )
  }

  return false
}
