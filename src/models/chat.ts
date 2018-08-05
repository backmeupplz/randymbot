// Dependencies
import { prop, Typegoose } from 'typegoose'

// Winner class definition
export class Chat extends Typegoose {
  @prop({ required: true, index: true })
  chatId: number
  @prop({ required: true, default: 'en' })
  language: string
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