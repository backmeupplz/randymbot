// Dependencies
import { arrayProp, prop, Typegoose } from 'typegoose'
import { Message } from 'telegram-typings'

export class Chat extends Typegoose {
  @prop({ required: true, index: true })
  chatId: number
  @prop({ required: true, default: 'en' })
  language: string
  @prop({ required: true, default: 1 })
  number: number
  @prop()
  subscribe?: string
  @prop({ required: true, default: false })
  nodelete: boolean

  @prop()
  raffleMessage?: Message
  @prop()
  winnerMessage?: Message

  @arrayProp({ required: true, default: [], items: Number })
  adminChatIds: number[]
  @prop()
  editedChatId?: number
}

// Get Chat model
const ChatModel = new Chat().getModelForClass(Chat)

/**
 * Returns chat, creates one if required
 * @param chatId Chat id of the chat
 * @returns requestedchat
 */
export async function findChat(chatId: number) {
  let chat = await ChatModel.findOne({ chatId })
  if (!chat) {
    chat = new ChatModel({ chatId })
    chat = await chat.save()
  }
  return chat
}
