import { Context as BaseContext } from 'grammy'
import { Chat } from '@/models/Chat'
import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n/dist/source'
import { Message } from '@grammyjs/types'
import sendOptions from '@/helpers/sendOptions'

class Context extends BaseContext {
  readonly i18n!: I18nContext
  dbchat!: DocumentType<Chat>

  replyWithLocalization: this['reply'] = (text, other = {}, ...rest) => {
    text = this.i18n.t(text)
    return this.reply(text, { ...sendOptions(this), ...other }, ...rest)
  }

  sendCopy = (message: Message) => {
    return !message.text
      ? false
      : this.reply(message.text, {
          entities: message.entities,
        })
  }

  editMessageTextWithLocalization: this['editMessageText'] = (
    text,
    other = {},
    ...rest
  ) => {
    text = this.i18n.t(text)
    return this.editMessageText(
      text,
      { ...sendOptions(this), ...other },
      ...rest
    )
  }
}

export default Context
