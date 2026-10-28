import * as mongoose from 'mongoose'
import { mongoStore, promos } from './promo'

// Randy's reply-promo hook (promo.ts; campaigns from Prime Radiant's
// go/campaigns.json). Off until PROMO_TOKEN is set.
export const promo = promos(
  'randy',
  mongoStore(mongoose.connection.collection('promos') as any)
)
