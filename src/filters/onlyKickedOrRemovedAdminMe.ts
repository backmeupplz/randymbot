import Context from '@/models/Context'

export default function onlyKickedOrRemovedAdminMe(ctx: Context) {
  return (
    ctx.myChatMember?.new_chat_member.status === 'left' ||
    ctx.myChatMember?.new_chat_member.status === 'kicked' ||
    (ctx.myChatMember?.new_chat_member.status === 'member' &&
      ctx.myChatMember?.old_chat_member.status === 'administrator')
  )
}
