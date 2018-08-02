// Dependencies
import { prop, arrayProp, Typegoose } from 'typegoose'

// Winner class definition
export class Raffle extends Typegoose {
  @prop({ required: true, index: true })
  chatId: number
  @prop({ required: true, index: true })
  messageId: number
  @arrayProp({ required: true, default: [], items: Number })
  participantsIds: number[]

  @prop()
  winner?: number
}

// Get Raffle model
const RaffleModel = new Raffle().getModelForClass(Raffle)

/**
 * Adding new raffle
 * @param chatId Chat id of the raffle
 * @param messageId Message id of the raffle
 * @returns created raffle
 */
export async function addRaffle(chatId: number, messageId: number) {
  let raffle = new RaffleModel({ chatId, messageId })
  return await raffle.save()
}

/**
 * Getting existing raffle
 * @param chatId Chat id of the raffle
 * @param messageId Message id of the raffle
 * @returns requested raffle
 */
export async function getRaffle(chatId: number, messageId: number) {
  return await RaffleModel.findOne({ chatId, messageId })
}