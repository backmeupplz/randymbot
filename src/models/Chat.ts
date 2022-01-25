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
  @prop()
  raffleMessageSetupMessageId?: number

  @prop({ required: true, default: [] })
  adminChatIds!: number[]
  @prop()
  editedChatId?: number
}

const ChatModel = getModelForClass(Chat)

export function findOrCreateChat(chatId: number) {
  return ChatModel.findOrCreate({ chatId })
}

export function findChat(chatId: number) {
  return ChatModel.findOne({ chatId })
}

export function deleteChatIdFromAdminChatIds(chatId: number) {
  return ChatModel.updateMany(
    {
      adminChatIds: chatId,
    },
    {
      $pull: { adminChatIds: chatId },
    }
  )
}

export function deleteChatIdFromEditedChatId(chatId: number) {
  return ChatModel.updateMany(
    {
      editedChatId: chatId,
    },
    {
      $unset: { editedChatId: 1 },
    }
  )
}

export function addChatIdToAdminChatIds(fromId: number, chatId: number) {
  return ChatModel.updateOne(
    {
      chatId: fromId,
    },
    {
      $addToSet: { adminChatIds: chatId },
    }
  )
}

export function addChatIdToEditedChatId(fromId: number, chatId: number) {
  return ChatModel.updateOne(
    {
      chatId: fromId,
    },
    {
      $set: { editedChatId: chatId },
    }
  )
}

export function deleteOneFromAdminChatIds(fromId: number, chatId: number) {
  return ChatModel.updateOne(
    {
      chatId: fromId,
    },
    {
      $pull: { adminChatIds: chatId },
    }
  )
}

export function deleteOneFromEditedChatId(fromId: number) {
  return ChatModel.updateOne(
    {
      chatId: fromId,
    },
    {
      $unset: { editedChatId: 1 },
    }
  )
}
