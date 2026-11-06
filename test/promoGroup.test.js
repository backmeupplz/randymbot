// node --test test/ after tsc: group promos (approvals.md 2026-11-06,
// agentboard #482): the group hook (src/helpers/promo.ts, a copy of Prime
// Radiant's go/promo.ts), the button under a raffle's winners, /promos
const test = require('node:test')
const assert = require('node:assert')
const path = require('path')
const { groupArm, groupKey, memoryStore, promos } = require('../dist/helpers/promo')

const dist = (rel) => path.join(__dirname, '..', 'dist', rel)
const mock = (rel, exports) => {
  require.cache[dist(rel)] = { id: dist(rel), filename: dist(rel), loaded: true, exports }
}

const TOPICS = { en: ['crypto', 'nft'], ru: ['крипт'] }
const cfg = {
  base: 'https://lumen.borodutch.com/go',
  bots: { randy: { enabled: true, code: 'randy' }, banofbot: { enabled: true, code: 'ban' } },
  campaigns: ['randy', 'banofbot'].map((bot, i) => ({
    id: `gp${i + 3}`, bot, status: 'running', target: 'https://t.me/jev_antispam_bot', chats: ['group'], cap_days: 7,
    langs: ['en', 'ru'], text: { en: 'Jev', ru: 'Jev' }, topics: TOPICS,
    variants: [{ id: 'a', share: 0.25, format: 'button', text: { en: 'No more scams', ru: 'Без скама' } }],
  })),
}
const groups = Array.from({ length: 4000 }, (_, i) => -1001000000000 - i)
const inBoth = groups.filter((g) => cfg.campaigns.every((c) => (groupArm(c, 'S', g) || {}).id === 'a'))

test('hook: one promo per group per 7 days across bots, claimed on the go service by a salted group hash', async () => {
  const claims = new Map()
  const sent = []
  const real = global.fetch
  const json = (o) => new Response(JSON.stringify(o))
  global.fetch = async (url, init) => {
    sent.push({ url, body: init && init.body })
    if (url.includes('/salt?bot=')) return json({ salt: 'S' })
    if (url.endsWith('campaigns.json')) return json(cfg)
    if (url.endsWith('/go/group')) {
      const { g, k, at } = JSON.parse(init.body)
      if (k === 'release') {
        if (claims.get(g) === at) claims.delete(g)
        return json({ ok: true })
      }
      if (claims.has(g)) return json({ ok: false, at: claims.get(g) })
      claims.set(g, Date.now())
      return json({ ok: true, at: claims.get(g) })
    }
    return json({ stored: 1 })
  }
  try {
    const randy = promos('randy', memoryStore(), { PROMO_TOKEN: 't' })
    const ban = promos('banofbot', memoryStore(), { PROMO_TOKEN: 't' })
    await randy.refresh()
    await ban.refresh()
    const [g, h] = inBoth
    const secret = 'Giveaway: win crypto, secret code 42'
    assert.strictEqual(await randy.group(g, 'channel', 'en', secret), null)
    assert.strictEqual(await randy.group(g, 'supergroup', 'en', 'a book giveaway'), null)
    const d = await randy.group(g, 'supergroup', 'en', secret)
    assert.deepStrictEqual(d.promo, { text: 'No more scams', url: 'https://t.me/jev_antispam_bot?start=gp3-a-randy', format: 'button' })
    await randy.record(d)
    const b = await ban.group(g, 'group', 'en', ['gp4'])
    assert.strictEqual(b.arm, 'a')
    assert.strictEqual(b.promo, undefined) // Randy has this group's week
    const r2 = await randy.group(h, 'group', 'en', secret)
    randy.release(r2)
    await new Promise((resolve) => setImmediate(resolve))
    assert.ok((await ban.group(h, 'group', 'en', ['gp4'])).promo) // released, so Banofbot can
    assert.ok(claims.has(groupKey('S', h)))
    assert.ok(!JSON.stringify(sent).includes('secret') && !JSON.stringify(sent).includes(String(g).slice(1)))
  } finally {
    global.fetch = real
  }
})

test("a raffle's winners: the button when the raffle matched, only in its own group", async () => {
  const asked = []
  const recorded = []
  const released = []
  let decision = null
  mock('helpers/promoBot.js', {
    promo: {
      group: async (...args) => {
        asked.push(args)
        return decision
      },
      record: async (d, shown = true) => void recorded.push(shown ? d : ['unshown', d]),
      release: (d) => void released.push(d),
    },
  })
  // models/index.js connects to Mongo when loaded
  mock('models/index.js', {})
  mock('models/chat.js', { findChat: async () => ({}) })
  delete require.cache[dist('helpers/raffle.js')]
  const { finishRaffle } = require('../dist/helpers/raffle')
  const calls = []
  let fail = false
  const telegram = {
    getChatMember: async (chat, id) => ({ status: 'member', user: { id, username: `u${id}` } }),
    editMessageText: async (...args) => {
      calls.push(['edit', ...args])
      // Telegraf's TelegramError carries the HTTP code
      const refused = (description) => Object.assign(new Error(`400: ${description}`), { code: 400, description })
      if (fail === 'all') throw refused('Bad Request: message to edit not found')
      if (fail === 'timeout') throw Object.assign(new Error('ETIMEDOUT'), { code: 'ETIMEDOUT' })
      if (fail === 'button' && args[4].reply_markup) throw refused('Bad Request: BUTTON_URL_INVALID')
    },
    editMessageCaption: async (...args) => void calls.push(['caption', ...args]),
    sendMessage: async (...args) => void calls.push(['send', ...args]),
  }
  const group = -1001234
  const raffle = (over) => ({
    chatId: group,
    messageId: 9,
    participantsIds: [1, 2, 3],
    raffleMessage: { text: 'Win an NFT! $numberOfParticipants in' },
    save: async () => undefined,
    ...over,
  })
  const chat = (over) => ({ language: 'en', number: 1, nodelete: false, ...over })
  const ctx = (over) => ({ chat: { id: group, type: 'supergroup' }, message: { text: 'done' }, telegram, ...over })
  decision = {
    campaign: 'gp3',
    arm: 'a',
    unit: '0123456789abcdef',
    promo: { text: 'No more scams', url: 'https://t.me/jev_antispam_bot?start=gp3-a-randy', format: 'button' },
  }
  await finishRaffle(raffle(), ctx(), chat())
  assert.deepStrictEqual(asked[0], [group, 'supergroup', 'en', 'Win an NFT! $numberOfParticipants in\ndone'])
  const edit = calls.pop()
  assert.strictEqual(edit[0], 'edit')
  assert.deepStrictEqual(edit[5].reply_markup, { inline_keyboard: [[{ text: 'No more scams', url: decision.promo.url }]] })
  assert.match(edit[4], /Winner|winner/i)
  assert.deepStrictEqual(recorded, [decision])
  // several winners, /nodelete: a new message carries it
  await finishRaffle(raffle(), ctx(), chat({ number: 2, nodelete: true }))
  const send = calls.pop()
  assert.strictEqual(send[0], 'send')
  assert.ok(send[3].reply_markup)
  // the hook found nothing: no keyboard at all
  const none = decision
  decision = null
  await finishRaffle(raffle({ raffleMessage: undefined }), ctx({ message: { caption: 'photo' } }), chat())
  assert.strictEqual(asked[asked.length - 1][3], 'photo')
  assert.strictEqual(calls.pop()[5].reply_markup, undefined)
  // ended by a forward in a private chat: no question asked
  const before = asked.length
  await finishRaffle(raffle(), ctx({ chat: { id: 5, type: 'private' } }), chat())
  assert.strictEqual(asked.length, before)
  // the announcement failed, with and without the button: released, nothing
  // recorded, the error goes on
  decision = none
  fail = 'all'
  let tries = calls.length
  await assert.rejects(finishRaffle(raffle(), ctx(), chat()))
  assert.deepStrictEqual(released, [none])
  assert.strictEqual(recorded.filter(Boolean).length, 2)
  assert.strictEqual(calls.length - tries, 2)
  assert.strictEqual(calls[calls.length - 1][5].reply_markup, undefined)
  // Telegram refused only the button: the winners go out without it, recorded
  // as not shown (the group's cap isn't used up)
  fail = 'button'
  tries = calls.length
  await finishRaffle(raffle(), ctx(), chat())
  assert.strictEqual(calls.length - tries, 2)
  assert.ok(calls[calls.length - 2][5].reply_markup)
  assert.strictEqual(calls[calls.length - 1][5].reply_markup, undefined)
  assert.match(calls[calls.length - 1][4], /Winner|winner/i)
  assert.deepStrictEqual(recorded[recorded.length - 1], ['unshown', none])
  assert.deepStrictEqual(released, [none])
  // any other error (it may have gone out): no second try, released
  fail = 'timeout'
  tries = calls.length
  await assert.rejects(finishRaffle(raffle(), ctx(), chat()))
  assert.strictEqual(calls.length - tries, 1)
  assert.deepStrictEqual(released, [none, none])
})

test('/promos: status and on/off for group admins only, groups only; /privacy', async () => {
  let on = true
  const set = []
  mock('helpers/promoBot.js', {
    promo: {
      groupOn: async () => on,
      setGroup: async (chat, value) => {
        set.push([chat, value])
        on = value
        return true
      },
    },
  })
  let admin = false
  const deleted = []
  // like helpers/checkAdmin.ts: channels and private chats pass, a group
  // member's command is deleted
  mock('helpers/checkAdmin.js', {
    checkIfAdmin: async (ctx, shouldDelete = true) => {
      if (['channel', 'private'].includes(ctx.chat.type)) return true
      if (!admin && shouldDelete) deleted.push(ctx.message.text)
      return admin
    },
  })
  mock('models/chat.js', { findChat: async () => ({ language: 'en' }) })
  delete require.cache[dist('commands/promos.js')]
  const { setupPromos } = require('../dist/commands/promos')
  const handlers = {}
  setupPromos({ command: (name, f) => void (handlers[name] = f) })
  const replies = []
  const run = (name, text, type = 'supergroup') =>
    handlers[name]({ chat: { id: -100, type }, message: { text }, reply: async (t) => void replies.push(t) })
  // a member: no reply at all, the command is deleted
  await run('promos', '/promos')
  await run('promos', '/promos off')
  await run('privacy', '/privacy')
  assert.deepStrictEqual(replies, [])
  assert.deepStrictEqual(deleted, ['/promos', '/promos off', '/privacy'])
  assert.deepStrictEqual(set, [])
  admin = true
  await run('promos', '/promos')
  assert.match(replies.pop(), /^📣/)
  await run('promos', '/promos@randymbot OFF')
  assert.match(replies.pop(), /^🔕 Done/)
  assert.deepStrictEqual(set, [[-100, false]])
  await run('promos', '/promos on', 'channel')
  assert.match(replies.pop(), /group chats/)
  await run('privacy', '/privacy')
  assert.match(replies.pop(), /never stored or logged[\s\S]*privacy\.borodutch\.com$/)
})
