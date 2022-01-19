import Context from '@/models/Context'

export default function onlyIfBotDesignatedAdmin(ctx: Context) {
  if (
    ctx.chat &&
    ctx.myChatMember?.new_chat_member.status === 'administrator'
  ) {
    if (['group', 'supergroup'].includes(ctx.chat.type)) {
      return ctx.myChatMember.new_chat_member.can_delete_messages
    }

    if (['channel'].includes(ctx.chat.type)) {
      return (
        ctx.myChatMember.new_chat_member.can_delete_messages &&
        !!ctx.myChatMember.new_chat_member.can_post_messages &&
        !!ctx.myChatMember.new_chat_member.can_edit_messages
      )
    }
  }

  return false
}
