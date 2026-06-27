export function trimLeadingBlankLines(text: string) {
  return text.replace(/^[\s\uFEFF]+/, '')
}

export function escapeTelegramHtml(text: string | number) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeTelegramHtmlAttribute(text: string) {
  return escapeTelegramHtml(text).replace(/"/g, '&quot;')
}

function unescapeMarkdownText(text: string) {
  return text.replace(/\\([_*\[\]()~`>#+=|{}.!-])/g, '$1')
}

export function markdownishToTelegramHtml(text: string) {
  const pattern = /`([^`]+)`|\[([^\]]+)\]\s*\((https?:\/\/[^)\s]+)\)/g
  let html = ''
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text))) {
    html += escapeTelegramHtml(unescapeMarkdownText(text.slice(cursor, match.index)))

    if (match[1]) {
      html += `<code>${escapeTelegramHtml(unescapeMarkdownText(match[1]))}</code>`
    } else {
      html += `<a href="${escapeTelegramHtmlAttribute(match[3])}">${escapeTelegramHtml(
        unescapeMarkdownText(match[2])
      )}</a>`
    }

    cursor = match.index + match[0].length
  }

  html += escapeTelegramHtml(unescapeMarkdownText(text.slice(cursor)))
  return trimLeadingBlankLines(html)
}

export function formatChannelHandles(handles: string[]) {
  return handles
    .map((handle) => `${!isNaN(+handle) ? '' : '@'}${escapeTelegramHtml(handle)}`)
    .join(', ')
}

export function replyWithHtml(
  ctx: { reply: (text: string, extra?: any) => any },
  html: string,
  extra: any = {}
) {
  return ctx.reply(trimLeadingBlankLines(html), {
    ...extra,
    parse_mode: 'HTML',
  } as any)
}
