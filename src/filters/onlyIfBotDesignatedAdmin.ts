import Context from '@/models/Context'

export default function onlyIfBotDesignatedAdmin(ctx: Context) {
  return (
    ctx.myChatMember?.new_chat_member.status === 'administrator' &&
    ctx.myChatMember?.old_chat_member.status !== 'administrator'
  )
}
