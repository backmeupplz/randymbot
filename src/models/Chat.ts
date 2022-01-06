import * as findorcreate from 'mongoose-findorcreate'
import { FindOrCreate } from '@typegoose/typegoose/lib/defaultClasses'
import { Message } from '@grammyjs/types'
import {
  Severity,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from '@typegoose/typegoose'

// TODO: subscribe -> subscriptions
// TODO: nodelete -> keepRaffleMessage

@plugin(findorcreate)
@modelOptions({
  schemaOptions: { timestamps: true },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Chat extends FindOrCreate {
  @prop({ required: true, index: true })
  chatId!: number
  @prop({ required: true, default: 'en' })
  language!: string
  @prop({ required: true, default: 1 })
  number!: number
  @prop({ required: true, default: [] })
  subscriptions!: string[]
  @prop({ required: true, default: false })
  keepRaffleMessage!: boolean

  @prop()
  raffleMessage?: Message
  @prop()
  winnerMessage?: Message

  @prop()
  winnerMessageSetupMessageId?: number

  @prop({ required: true, default: [] })
  adminChatIds!: number[]
  @prop()
  editedChatId?: number
}

const ChatModel = getModelForClass(Chat)

export function findOrCreateChat(chatId: number) {
  return ChatModel.findOrCreate({ chatId })
}
