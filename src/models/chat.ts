import * as findorcreate from 'mongoose-findorcreate'
import { FindOrCreate } from '@typegoose/typegoose/lib/defaultClasses'
import { Message } from '@grammyjs/types'
import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from '@typegoose/typegoose'

@plugin(findorcreate)
@modelOptions({ schemaOptions: { timestamps: true } })
export class Chat extends FindOrCreate {
  @prop({ required: true, index: true })
  chatId!: number
  @prop({ required: true, default: 'en' })
  language!: string
  @prop({ required: true, default: 1 })
  number!: number
  @prop()
  subscribe?: string
  @prop({ required: true, default: false })
  nodelete!: boolean

  @prop()
  raffleMessage?: Message
  @prop()
  winnerMessage?: Message

  @prop({ required: true, default: [] })
  adminChatIds!: number[]
  @prop()
  editedChatId?: number
}

const ChatModel = getModelForClass(Chat)

export function findOrCreateChat(chatId: number) {
  return ChatModel.findOrCreate({ chatId })
}
