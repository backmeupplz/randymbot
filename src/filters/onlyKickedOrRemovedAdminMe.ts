import Context from '@/models/Context'

export default function onlyKickedOrRemovedAdminMe(ctx: Context) {
  if (ctx.myChatMember) {
    if (['left', 'kicked'].includes(ctx.myChatMember.new_chat_member.status)) {
      return true
    }

    if (
      ctx.myChatMember.new_chat_member.status === 'member' &&
      ctx.myChatMember.old_chat_member.status === 'administrator'
    ) {
      return true
    }

    if (
      ctx.myChatMember.new_chat_member.status === 'administrator' &&
      (!ctx.myChatMember.new_chat_member.can_delete_messages ||
        !ctx.myChatMember.new_chat_member.can_post_messages ||
        !ctx.myChatMember.new_chat_member.can_edit_messages)
    ) {
      return true
    }
  }

  return false
}
