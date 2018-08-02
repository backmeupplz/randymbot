// Dependencies
import { Telegraf, ContextMessageUpdate } from 'telegraf'

/**
 * Setting up the start and help commands
 * @param bot Bot to setup the commands
 */
export function setupStartAndHelp(bot: Telegraf<ContextMessageUpdate>) {
  bot.command(['start', 'help'], (ctx) => {
    const text = ctx.chat.type === 'private' ?
      'Привет! Это Рэнди Марш. Я умею случайным образом выбирать участника чата или канала из тех, что нажали на кнопку "Участвовать". Добавьте меня на канал или в чат, отправьте команду /randy и начнется розыгрыш. Ответьте на сообщение о розыгрыше любым сообщением и розыгрыш завершится, а победитель будет выбран из участников.' :
      'Привет! Это Рэнди Марш. Я умею случайным образом выбирать участника чата или канала из тех, что нажали на кнопку "Участвовать". Отправьте мне команду /randy и начнется розыгрыш. Ответьте на сообщение о розыгрыше любым сообщением и розыгрыш завершится, а победитель будет выбран из участников.'
    ctx.replyWithMarkdown(text)
  })
}