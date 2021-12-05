import { startRaffle } from '@/helpers/raffle'
import Context from '@/models/Context'

export default async function handleRandy(ctx: Context) {
  try {
    await ctx.deleteMessage()
  } catch {
    // Do nothing
  }
  return startRaffle(ctx)
}
