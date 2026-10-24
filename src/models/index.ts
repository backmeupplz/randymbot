// Dependencies
import * as mongoose from 'mongoose'

// Keep Mongoose 6's strict filters and silence its Mongoose 7 deprecation warning
mongoose.set('strictQuery', true)

// Connect to mongoose
mongoose.connect(process.env.MONGO)

// Get models
import { addRaffle, getRaffle, Raffle, getRaffleWithoutParticipantIds, RaffleModel } from './raffle'
// Export models
export { addRaffle, getRaffle, Raffle, getRaffleWithoutParticipantIds, RaffleModel }
