import Context from '@/models/Context'

export default function gotKickedMe(ctx: Context) {
  return ctx.myChatMember?.new_chat_member.status === 'left'
}
