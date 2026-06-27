const assert = require('assert')
const fs = require('fs')
const path = require('path')
const ts = require('typescript')

function requireTypescriptSource(sourcePath) {
  const source = fs.readFileSync(sourcePath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2017,
    },
  }).outputText
  const module = { exports: {} }
  Function('exports', 'require', 'module', '__filename', '__dirname', compiled)(
    module.exports,
    require,
    module,
    sourcePath,
    path.dirname(sourcePath)
  )
  return module.exports
}

const {
  escapeTelegramHtml,
  formatChannelHandles,
  markdownishToTelegramHtml,
  replyWithHtml,
  trimLeadingBlankLines,
} = requireTypescriptSource(path.join(__dirname, '../src/helpers/telegramHtml.ts'))

assert.strictEqual(trimLeadingBlankLines('\n\n  Advice'), 'Advice')

assert.strictEqual(
  markdownishToTelegramHtml('\n\nRead [docs](https://example.com?a=1&b=2) and run `/start <now>`'),
  'Read <a href="https://example.com?a=1&amp;b=2">docs</a> and run <code>/start &lt;now&gt;</code>'
)

assert.strictEqual(
  markdownishToTelegramHtml('Support: @borodutch\\_support & <ok>'),
  'Support: @borodutch_support &amp; &lt;ok&gt;'
)

assert.strictEqual(
  formatChannelHandles(['news&tips', '12345', 'bad<tag>']),
  '@news&amp;tips, 12345, @bad&lt;tag&gt;'
)

const replies = []
replyWithHtml(
  {
    reply(text, extra) {
      replies.push({ text, extra })
    },
  },
  '\n\n<b>Hello</b>',
  {
    disable_notification: true,
    parse_mode: 'Markdown',
  }
)

assert.deepStrictEqual(replies, [
  {
    text: '<b>Hello</b>',
    extra: {
      disable_notification: true,
      parse_mode: 'HTML',
    },
  },
])
