import Context from '@/models/Context'
import bot from '@/helpers/bot'
import sendOptions from '@/helpers/sendOptions'

export default async function handleCheckSubscription(ctx: Context) {
  // Get subscriptions
  const subscriptions =
    !!ctx.match &&
    typeof ctx.match === 'string' &&
    ctx.match.split(', ').map((s) => s.replace('@', ''))
  // Check if subscriptions need to be removed
  if (!subscriptions || !subscriptions.length) {
    ctx.dbchat.subscriptions = []
    await ctx.dbchat.save()
    return ctx.replyWithLocalization('check_subscription_empty')
  }
  // Check at every channel if the bot is an admin
  for (const subscription of subscriptions) {
    const me = await ctx.api.getChatMember(subscription, bot.botInfo.id)
    if (me.status !== 'administrator') {
      return ctx.reply(
        ctx.i18n.t('bot_not_admin_error', {
          bot: `@${bot.botInfo.username}`,
          chat: `@${subscription}`,
        }),
        sendOptions(ctx)
      )
    }
  }
  // Save subscriptions
  ctx.dbchat.subscriptions = subscriptions
  // Reply with success
  return ctx.reply(
    ctx.i18n.t('check_subscription_success', {
      bot: `@${bot.botInfo.username}`,
      chats: subscriptions.map((s) => `@${s}`).join(', '),
    })
  )
}
