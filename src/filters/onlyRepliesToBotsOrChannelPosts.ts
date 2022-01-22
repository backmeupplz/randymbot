import Context from '@/models/Context'

export default function onlyRepliesToBotsOrChannelPosts(ctx: Context) {
  return (
    !!ctx.msg?.reply_to_message?.from?.is_bot ||
    ctx.msg?.reply_to_message?.sender_chat?.type === 'channel'
  )
}
