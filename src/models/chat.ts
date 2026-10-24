// Dependencies
import { Schema, model } from 'mongoose'
import { Message } from 'telegram-typings'

export class Chat {
  chatId: number
  language: string
  number: number
  subscribe?: string
  nodelete: boolean

  raffleMessage?: Message
  winnerMessage?: Message

  adminChatIds: number[]
  editedChatId?: number
}

// Get Chat model
const ChatModel = model<Chat>(
  'Chat',
  new Schema<Chat>({
    chatId: { type: Number, required: true, index: true },
    language: { type: String, required: true, default: 'en' },
    number: { type: Number, required: true, default: 1 },
    subscribe: String,
    nodelete: { type: Boolean, required: true, default: false },
    raffleMessage: Schema.Types.Mixed,
    winnerMessage: Schema.Types.Mixed,
    adminChatIds: { type: [Number], required: true, default: [] },
    editedChatId: Number,
  })
)

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
