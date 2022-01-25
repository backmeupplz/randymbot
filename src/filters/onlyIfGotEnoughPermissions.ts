import Context from '@/models/Context'

export default function onlyIfGotEnoughPermissions(ctx: Context) {
  if (!ctx.chat || !ctx.myChatMember) {
    throw new Error('Chat or ChatMemberUpdated is undefined')
  }

  const myNewInf = ctx.myChatMember.new_chat_member

  if (myNewInf.status !== 'administrator') {
    return false
  }

  if (['group', 'supergroup'].includes(ctx.chat.type)) {
    return myNewInf.can_delete_messages
  }

  if (['channel'].includes(ctx.chat.type)) {
    return (
      myNewInf.can_delete_messages &&
      !!myNewInf.can_post_messages &&
      !!myNewInf.can_edit_messages
    )
  }

  return false
}
