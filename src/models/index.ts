// Dependencies
import * as mongoose from 'mongoose'

// Connect to mongoose
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
})

// Get models
import { addRaffle, getRaffle, Raffle } from './raffle'
// Export models
export { addRaffle, getRaffle, Raffle }
