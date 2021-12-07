import { Context as BaseContext } from 'grammy'
import { Chat } from '@/models/Chat'
import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n/dist/source'

class Context extends BaseContext {
  readonly i18n!: I18nContext
  dbchat!: DocumentType<Chat>

  replyWithLocalization: this['reply'] = (text, other, ...rest) => {
    text = this.i18n.t(text)
    return this.reply(text, other, ...rest)
  }

  editMessageTextWithLocalization: this['editMessageText'] = (
    text,
    other,
    ...rest
  ) => {
    text = this.i18n.t(text)
    return this.editMessageText(text, other, ...rest)
  }
}

export default Context
