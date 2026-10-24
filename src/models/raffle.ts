// Dependencies
import { Schema, model } from 'mongoose'
import { Message } from 'telegram-typings'

// Winner class definition
export class Raffle {
  chatId: number
  messageId?: number
  participantsIds: number[]

  winners?: string

  raffleMessage?: Message
  winnerMessage?: Message
}

// Get Raffle model
export const RaffleModel = model<Raffle>(
  'Raffle',
  new Schema<Raffle>({
    chatId: { type: Number, required: true, index: true },
    messageId: { type: Number, index: true },
    participantsIds: { type: [Number], required: true, default: [] },
    winners: String,
    raffleMessage: Schema.Types.Mixed,
    winnerMessage: Schema.Types.Mixed,
  })
)

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
export async function getRaffle(chatId: number, id: string | number) {
  try {
    const raffle = await RaffleModel.findById(id)
    if (raffle) {
      return raffle
    }
  } catch (err) {
    return RaffleModel.findOne({ chatId, messageId: Number(id) })
  }
}

/**
 * Getting existing raffle without the participant ids
 * @param chatId Chat id of the raffle
 * @param messageId Message id of the raffle
 * @returns requested raffle
 */
export async function getRaffleWithoutParticipantIds(chatId: number, id: string | number) {
  try {
    const raffle = await RaffleModel.findById(id).select('-participantsIds')
    if (raffle) {
      return raffle
    }
  } catch (err) {
    return RaffleModel.findOne({ chatId, messageId: Number(id) })
  }
}
