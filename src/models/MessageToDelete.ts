import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

// Todo: add message deletion interval

@modelOptions({ schemaOptions: { timestamps: true } })
export class MessageToDelete {
  @prop({ required: true })
  chatId!: number
  @prop({ required: true })
  messageId!: number
  @prop({ required: true })
  deleteInSeconds!: number
}

export const MessageToDeleteModel = getModelForClass(MessageToDelete)
