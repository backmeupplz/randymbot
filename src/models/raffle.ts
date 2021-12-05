import { Message } from '@grammyjs/types'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Raffle {
  @prop({ required: true, index: true })
  chatId!: number
  @prop({ index: true })
  messageId?: number
  @prop({ required: true, default: [] })
  participantsIds!: number[]
  @prop()
  winners?: string
  @prop()
  raffleMessage?: Message
  @prop()
  winnerMessage?: Message
}

const RaffleModel = getModelForClass(Raffle)

export function addRaffle(chatId: number) {
  return RaffleModel.create({ chatId })
}

export function getRaffleById(id: string) {
  return RaffleModel.findById(id)
}

export function getRaffle(chatId: number, messageId: number) {
  return RaffleModel.findOne({ chatId, messageId })
}
