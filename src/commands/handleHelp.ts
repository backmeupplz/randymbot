import Context from '@/models/Context'

export default function handleHelp(ctx: Context) {
  return ctx.reply(ctx.i18n.t('help'), {
    reply_to_message_id: ctx.msg?.message_id,
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  })
}
