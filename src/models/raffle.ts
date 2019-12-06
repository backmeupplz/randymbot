// Dependencies
import { prop, arrayProp, Typegoose } from 'typegoose'

// Winner class definition
export class Raffle extends Typegoose {
  @prop({ required: true, index: true })
  chatId: number
  @prop({ index: true })
  messageId?: number
  @arrayProp({ required: true, default: [], items: Number })
  participantsIds: number[]

  @prop()
  winners?: string
}

// Get Raffle model
const RaffleModel = new Raffle().getModelForClass(Raffle)

/**
 * Adding new raffle
 * @param chatId Chat id of the raffle
 * @param messageId Message id of the raffle
 * @returns created raffle
 */
export async function addRaffle(chatId: number) {
  let raffle = new RaffleModel({ chatId })
  return raffle.save()
}

/**
 * Getting existing raffle
 * @param chatId Chat id of the raffle
 * @param messageId Message id of the raffle
 * @returns requested raffle
 */
export async function getRaffle(chatId: number, id: number) {
  const raffle = await RaffleModel.findById(id)
  if (raffle) {
    return raffle
  }
  return RaffleModel.findOne({ chatId, messageId: id })
}
