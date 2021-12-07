import Context from '@/models/Context'

export default function sendOptions(ctx: Context) {
  return {
    reply_to_message_id: ctx.msg?.message_id,
    parse_mode: 'Markdown' as const,
    disable_web_page_preview: true,
    disable_notification: true,
  }
}
