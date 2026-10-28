// node --test test/ after tsc: the reply-promo hook (src/helpers/promo.ts, a copy of
// Prime Radiant's go/promo.ts) as Randy uses it
const test = require('node:test')
const assert = require('node:assert')
const { arm, decide, keyboard, markdown, memoryStore, promos, startPayload, unitOf } = require('../dist/helpers/promo')

const BOT = 'randy'
const cfg = (over = {}) => ({
  base: 'https://lumen.borodutch.com/go',
  bots: { [BOT]: { enabled: true, code: 'randy' } },
  campaigns: [{
    id: 'p1', bot: BOT, status: 'running', target: 'https://t.me/voicybot', chats: ['private'], cap_days: 7,
    langs: ['en', 'ru'], text: { en: 'Voice to text', ru: 'Голос в текст' },
    variants: [{ id: 'a', share: 0.1, format: 'caption' }, { id: 'b', share: 0.1, format: 'button', text: { en: 'Btn', ru: 'Кн' } }],
    ...over,
  }],
})
const users = Array.from({ length: 5000 }, (_, i) => 1000 + i)
const inArm = (id) => users.find((u) => (arm(cfg().campaigns[0], u) || {}).id === id)

test('decide: deep link, languages, groups, caps, switches', () => {
  const a = decide(cfg(), BOT, 's', inArm('a'), 'private', 'en', undefined)
  assert.deepStrictEqual(a.promo, { text: 'Voice to text', url: 'https://t.me/voicybot?start=p1-a-randy', format: 'caption' })
  assert.strictEqual(decide(cfg(), BOT, 's', inArm('b'), 'private', 'ru', undefined).promo.text, 'Кн')
  assert.strictEqual(decide(cfg(), BOT, 's', inArm(undefined), 'private', 'en', undefined).arm, 'holdout')
  assert.strictEqual(decide(cfg(), BOT, 's', inArm('a'), 'supergroup', 'en', undefined), null)
  assert.strictEqual(decide(cfg(), BOT, 's', inArm('a'), 'private', 'de', undefined), null)
  assert.strictEqual(decide(cfg({ status: 'paused' }), BOT, 's', inArm('a'), 'private', 'en', undefined), null)
  const now = Date.now()
  assert.strictEqual(decide(cfg(), BOT, 's', inArm('a'), 'private', 'en', now - 6 * 86400000, now).promo, undefined)
})

test('rendering', () => {
  const p = { text: 'Hi [x]_', url: 'https://t.me/voicybot?start=p1-a-randy', format: 'caption' }
  assert.strictEqual(markdown(p), '\n\n[Hi x](https://t.me/voicybot?start=p1-a-randy)')
  assert.strictEqual(keyboard(p), undefined)
  assert.strictEqual(keyboard({ ...p, format: 'button' }).inline_keyboard.length, 1)
  assert.strictEqual(startPayload('/start@randymbot p1-a-vdb'), 'p1-a-vdb')
})

test('hook: salt, cap in the store, events', async () => {
  const sent = []
  const real = global.fetch
  global.fetch = async (url, init = {}) => {
    sent.push({ url, body: init.body })
    if (url.includes('/salt?bot=randy')) return new Response(JSON.stringify({ salt: 'S' }))
    if (url.endsWith('campaigns.json')) return new Response(JSON.stringify(cfg()))
    return new Response('{"stored": 1}')
  }
  try {
    const h = promos(BOT, memoryStore(), { PROMO_TOKEN: 't' })
    await h.refresh()
    const d = await h.decide(inArm('a'), 'private', 'en')
    assert.strictEqual(d.unit, unitOf('S', 'p1', inArm('a')))
    await h.record(d)
    assert.strictEqual((await h.decide(inArm('a'), 'private', 'en')).promo, undefined)
    h.blocked(inArm(undefined))
    await h.arrived(77, 'xp1-a-vdb', true)
    await h.used(77)
    await h.used(77)
    await h.flush()
    const ev = JSON.parse(sent[sent.length - 1].body).events.map((e) => `${e.v}:${e.k}`)
    assert.deepStrictEqual(ev, ['a:seen', 'a:shown', 'holdout:blocked', 'a:start', 'a:new', 'a:use'])
    // off without a token
    assert.strictEqual(await promos(BOT, memoryStore(), {}).decide(1, 'private', 'en'), null)
  } finally {
    global.fetch = real
  }
})
