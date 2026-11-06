export function loc(text: string, language: string) {
  return localizations[text][language] || localizations[text].en
}

export const localizations: { [index: string]: { [index: string]: string } } = {
  public_help_start: {
    ru:
      'Привет! Это Рэнди Марш. Я умею случайным образом выбирать участника чата или канала из тех, что нажали на кнопку "Участвовать". Мой исходный код [вот тут](https://github.com/backmeupplz/randymbot). Сменить язык можно командой /language. Сменить количество победителей (стандартно — 1) командой /number (можете использовать формат `/number 100`).\n\n1. Отправьте команду /randy и начнется розыгрыш.\n2. Ответьте на сообщение о розыгрыше любым сообщением, и розыгрыш завершится, а победитель будет выбран из участников.\n\nЕсли вы хотите проверять подписку на определенный канал перед тем, как разрешить человеку участвовать, настройте эту функцию командой в формате `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`. Если вы хотите отключить эту функцию, напишите /nosubscribe. Хотите настроить собственное сообщение о розыгрыше? Используйте /raffleMessage. Хотите использовать обычное сообщение о розыгрыше? Используйте /noRaffleMessage. /winnerMessage и /noWinnerMessage работают так же.  Используйте /nodelete, если хотите оставить оригинальное сообшение.\n\nХотите настроить розыгрыш, но не хотите засорять сообщениями настройки чат или канал? Вы можете сделать это в личных сообщениях со мной. Просто пришлите мне в личные сообщения форвард любого канала или чата, где вы админ (или пришлите сообщение формата `/addChat 123456789` или `/addChat @borodutcher`). После, выберите канал или чат, который хотите настраивать, при помощи команды /configRaffle. Дальше присылайте мне в личные сообщения настройки, описанные выше, чтобы настраивать розыгрыш в выбранном чате.\n\nОстались вопросы? Почитайте наш канал поддержки — @borodutch\\_support 🦄\n\nПопробуйте еще один мой проект — [Тудурант](https://todorant.com) ([iOS](https://apps.apple.com/ru/app/todorant/id1482078243), [Андроид](https://play.google.com/store/apps/details?id=com.todorant)). Это умный список задач, который использует поведенческую психологию для того, чтобы заставить ваш мозг выполнять задачи. Полностью бесплатен 30 дней без каких-либо обязательств, поэтому почему бы не попробовать улучшить свою продуктивность? Тудурант помог мне, поможет и вам!',
    en:
      "Hi there! I'm Randy Marsh. I can randomly select a raffle participant (that hit the \"Participate\" button) in a chat or a channel. My source code is [here](https://github.com/backmeupplz/randymbot). You can also change the /language the /number of winners per raffle (default is 1, you can use format `/number 100`).\n\n1. Send /randy command and the raffle will begin.\n2. Reply with any message to my raffle message to finish the raffle, and a random winner will be picked from the participants.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage. /winnerMessage and /noWinnerMessage work similarly. Use /nodelete if you don't want to delete the original message.\n\nWant to set up a raffle but don't want to send config messages to the chat or the channel? You can do so in private messages with me. First, forward any message from a channel or a chat where you are an admin (or add a chat with the command `/addChat 123456789` or `/addChat @borodutcher`). Then, select the chat or the channel you want to configure with the command /configRaffle. Then just send me the config commands described above to the private messages with me to set up the raffle in the selected chat or channel.\n\nStill got questions? Go to our support channel — @borodutch\\_support 🦄\n\nAlso check out another one of my projects — [Todorant](https://todorant.com) ([iOS](https://apps.apple.com/us/app/todorant/id1482078243), [Android](https://play.google.com/store/apps/details?id=com.todorant)). It is a smart todo list app that uses cognitive psychology to trick your brain into finishing projects and showing results. It's free for 30 days with no strings attached, so go give it a shot if you want to improve your productivity. It helped me — it can help you as well.",
    pt:
      "Olá! Eu sou Randy Marsh. Eu posso selecionar aleatoriamente um participante de sorteio (quem clica no botão \"Participar\") em um grupo ou canal. Meu código-fonte está [aqui] (https://github.com/backmeupplz/randymbot). Você também pode alterar o idioma em /language e o número de ganhadores em cada sorteio (o padrão é 1) com o comando /number.\n\n1. Me adicione a um canal ou a um grupo, envie o comando /randy e o sorteio começa.\n2. Responda com qualquer mensagem à minha mensagem de sorteio para terminá-lo e um vencedor será escolhido aleatoriamente será escolhido dentre os participantes.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage. /winnerMessage and /noWinnerMessage work similarly. Use /nodelete if you don't want to delete the original message.\n\nWant to set up a raffle but don't want to send config messages to the chat or the channel? You can do so in private messages with me. First, forward any message from a channel or a chat where you are an admin (or add a chat with the command `/addChat 123456789` or `/addChat @borodutcher`). Then, select the chat or the channel you want to configure with the command /configRaffle. Then just send me the config commands described above to the private messages with me to set up the raffle in the selected chat or channel.\n\nAinda tem perguntas? Visite nosso canal de suporte — @borodutch\\_support 🦄\n\nAlso check out another one of my projects — [Todorant](https://todorant.com) ([iOS](https://apps.apple.com/us/app/todorant/id1482078243), [Android](https://play.google.com/store/apps/details?id=com.todorant)). It is a smart todo list app that uses cognitive psychology to trick your brain into finishing projects and showing results. It's free for 30 days with no strings attached, so go give it a shot if you want to improve your productivity. It helped me — it can help you as well.",
    tr:
      "Merhaba! Ben Randy Marsh. Bir grupta veya kanalda rastgele bir çekiliş katılımcısını (\"Katıl\" düğmesine basan) seçebilirim. Kaynak kodum [burada](https://github.com/backmeupplz/randymbot). Ayrıca /language ile botun dilini ve /number ile çekilişi kazanacak kişi sayısını da değiştirebilirsiniz (varsayılan 1).\n\n1. Beni bir kanala veya gruba ekle, /randy komutunu gönder ve çekiliş başlasın!\n2. Çekilişi bitirmek için çekiliş iletime herhangi bir mesajla yanıt verin ve katılımcılardan rastgele bir kazanan seçilecektir.\n\nBir kullanıcının belirlediğiniz bir kanala abone olup olmadığını kontrol etmek istiyorsanız, botu şu formatta ayarlayabilirsiniz: `/subscribe @kameraonu`, `/subscribe @kanal_adi, @baska_kanal, @ve_baskabir_kanal`. Kapatmak istiyorsanız, /nosubscribe komutunu kullanın. Özel bir çekiliş mesajı belirlemek ister misiniz? /raffleMessage komutunu kullanın. Varsayılan çekiliş mesajına tekrar dönmek ister misiniz? /noRaffleMessage komutunu kullanın. /winnerMessage ve /noWinnerMessage komutları yine benzer şekilde kazanan kişi için yazılacak yazıyı belirleyen komutlardır. Use /nodelete if you don't want to delete the original message.\n\nWant to set up a raffle but don't want to send config messages to the chat or the channel? You can do so in private messages with me. First, forward any message from a channel or a chat where you are an admin (or add a chat with the command `/addChat 123456789` or `/addChat @borodutcher`). Then, select the chat or the channel you want to configure with the command /configRaffle. Then just send me the config commands described above to the private messages with me to set up the raffle in the selected chat or channel.\n\nBaşka soruların mı var? Destek kanalımıza gel — @borodutch\\_support 🦄\n\nAlso check out another one of my projects — [Todorant](https://todorant.com) ([iOS](https://apps.apple.com/us/app/todorant/id1482078243), [Android](https://play.google.com/store/apps/details?id=com.todorant)). It is a smart todo list app that uses cognitive psychology to trick your brain into finishing projects and showing results. It's free for 30 days with no strings attached, so go give it a shot if you want to improve your productivity. It helped me — it can help you as well.",
    uk:
      "Привіт! Це Ренді Марш. Я вмію випадковим чином вибирати учасника чату або каналу з тих, що натиснули на кнопку \"Взяти участь\". Мій вихідний код [ось тут](https://github.com/backmeupplz/randymbot). Змінити мову можна командою /language. Змінити кількість переможців (стандартно — 1) командою /number.\n\n1. Надішліть команду /randy і почнеться розіграш.\n2. Дайте відповідь на повідомлення про розіграш будь-яким повідомленням, і розіграш завершиться, а переможець буде обраний з учасників.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage. /winnerMessage and /noWinnerMessage work similarly. Use /nodelete if you don't want to delete the original message.\n\nWant to set up a raffle but don't want to send config messages to the chat or the channel? You can do so in private messages with me. First, forward any message from a channel or a chat where you are an admin (or add a chat with the command `/addChat 123456789` or `/addChat @borodutcher`). Then, select the chat or the channel you want to configure with the command /configRaffle. Then just send me the config commands described above to the private messages with me to set up the raffle in the selected chat or channel.\n\nЗалишилися питання? Почитайте наш канал підтримки — @borodutch\\_support 🦄\n\nAlso check out another one of my projects — [Todorant](https://todorant.com) ([iOS](https://apps.apple.com/us/app/todorant/id1482078243), [Android](https://play.google.com/store/apps/details?id=com.todorant)). It is a smart todo list app that uses cognitive psychology to trick your brain into finishing projects and showing results. It's free for 30 days with no strings attached, so go give it a shot if you want to improve your productivity. It helped me — it can help you as well.",
    ar:
      "مرحبًا بكم! (أنا (راندي مارش يمكنني اختيار مشارك السحب عشوائياً (الذي ضغط زر \"المشاركة\") في مجموعة أو قناة. رمز مصدري هو [هنا](https://github.com/backmeupplz/randymbot). يمكنك أيضًا تغيير اللغة /language وعدد الفائزين لكل سحب /number (الافتراضي هو 1، يمكنك استخدام تنسيق /number 100).\n\n1. إضافة لي إلى قناة أو مجموعة ، وإرسال الأمر /randy والسحب سيبدأ.\n2. الرد مع أي رسالة إلى رسالة السحب الخاصة بي لإنهاء السحب، وسيتم اختيار الفائز العشوائي من المشاركين.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage. /winnerMessage and /noWinnerMessage work similarly. Use /nodelete if you don't want to delete the original message.\n\nWant to set up a raffle but don't want to send config messages to the chat or the channel? You can do so in private messages with me. First, forward any message from a channel or a chat where you are an admin (or add a chat with the command `/addChat 123456789` or `/addChat @borodutcher`). Then, select the chat or the channel you want to configure with the command /configRaffle. Then just send me the config commands described above to the private messages with me to set up the raffle in the selected chat or channel.\n\nأمازلت تملك أسئلة؟ انتقل إلى قناة الدعم الخاصة بنا — @borodutch\\_support 🦄\n\nAlso check out another one of my projects — [Todorant](https://todorant.com) ([iOS](https://apps.apple.com/us/app/todorant/id1482078243), [Android](https://play.google.com/store/apps/details?id=com.todorant)). It is a smart todo list app that uses cognitive psychology to trick your brain into finishing projects and showing results. It's free for 30 days with no strings attached, so go give it a shot if you want to improve your productivity. It helped me — it can help you as well.",
    es:
      '"¡Hola! Soy Randy Marsh. Puedo selecionar aleatoriamente el participante de un sorteo (que toque el botón \\"Participar\\") en un grupo o canal. Mi código fuente está [aqui] (https://github.com/backmeupplz/randymbot). Usted também puede cambiar el idioma en /language y el número de ganadores en cada sorteo (por defecto es 1, puede usar el formato /number 100).\\n\\n1. Añádame a un canal o grupo, envíe el comando /randy y el sorteo comenzará.\\n2. Responda con cualquier mensaje a mi mensaje de sorteo para terminarlo, y se eligirá alteatoriamente un ganador entre los particpantes.\\n\\nSi desea saber si un usuario está suscrito a un canal en particular, puede configurar el bot con el siguiente formato `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`. Si desea apagarlo, use /nosubscribe. ¿Desea establecer un mensaje de sorteo personalizado? Use /raffleMessage. ¿Desea usar el mensaje de sorteo predeterminado? Use /noRaffleMessage. /winnerMessage y /noWinnerMessage funcionan de manera similar para el mensaje de los ganadores. Use /nodelete si no desea eliminar el mensaje original.\\n\\n¿Aun tiene perguntas? Visite nuestro canal de soporte — @borodutch\\\\_ support 🦄\\n\\nWant to set up a raffle but don\'t want to send config messages to the chat or the channel? You can do so in private messages with me. First, forward any message from a channel or a chat where you are an admin (or add a chat with the command `/addChat 123456789` or `/addChat @borodutcher`). Then, select the chat or the channel you want to configure with the command /configRaffle. Then just send me the config commands described above to the private messages with me to set up the raffle in the selected chat or channel.\\n\\nTambién revise otro de mis proyectos — [Todorant](https://todorant.com) ([iOS](https://apps.apple.com/us/app/todorant/id1482078243), [Android](https://play.google.com/store/apps/details?id=com.todorant)). Es una aplicación inteligente de gestión de tareas pendientes que usa psicología cognitiva para hacer trampas a su cerebro a fin de terminar proyectos y mostrar los resultados. Es gratuita por 30 días sin obligaciones, así que pruébela si desea aumentar su productividad. Me ha ayudado a mi — podría ayudarle a usted también."',
  },
  no_work_private: {
    ru: 'Простите, но эта команда не работает в личке с ботом.',
    en: 'Sorry, but this command is not available in private messages.',
    pt: 'Desculpe, mas este comando não está disponível em conversas privadas.',
    tr: 'Üzgünüm, bu komut özel mesajlarda kullanılamaz.',
    uk: 'Вибачте, але ця команда не працює в діалозі з ботом.',
    ar: 'عذراً، ولكن هذا الأمر غير متوفر في الرسائل الخاصة.',
    es:
      'Lo sentimos, pero este comando no está disponible en mensajes privados.',
  },
  select_language: {
    ru: 'Пожалуйста, выберите язык',
    en: 'Please, select the language',
    pt: 'Por favor, escolha o idioma',
    tr: 'Lütfen dilinizi seçiniz',
    uk: 'Будь ласка, оберіть мову',
    ar: 'الرجاء تحديد اللغة',
    es: 'Selecciones el lenguaje',
  },
  language_selected_randy: {
    ru: 'Спасибо, теперь я говорю по-русски!',
    en: 'Thank you! Now I speak English',
    pt: 'Obrigado! Agora eu falarei português',
    tr: 'Teşekkürler! Artık Türkçe konuşuyorum',
    uk: 'Дякую, тепер я говорю українською!',
    ar: 'شكرا! الآن أنا أتكلم العربية',
    es: 'Gracias! Ahora hablo Español',
  },
  raffle_text: {
    ru:
      'Розыгрыш начался! Нажмите на кнопку ниже, чтобы принять участие. Победитель будет выбран случайным образом из участников, когда администраторы ответят на это сообщение. Желаю удачи!',
    en:
      'Raffle has begun! Press the button below to participate. The winner will be randomly selected from the participants when an admin replies to this message. Good luck!',
    pt:
      'O sorteio começou! Toque no botão abaixo para participar. O vencedor será selecionado aleatoriamente dentre participantes quando um administrador responder a essa mensagem. Boa sorte!',
    tr:
      'Çekilis basladı! Katılmak için aşağıdaki butona basın. Bir yönetici bu mesaja cevap verdiğinde kazanan kişi, katılımcılar arasından rastgele olarak seçilecektir. İyi şanslar!',
    uk:
      'Розіграш розпочався! Натисніть на кнопку нижче, щоб взяти участь. Переможець буде обраний випадковим чином з учасників, коли адміністратори дадуть відповідь на це повідомлення. Бажаю удачі!',
    ar:
      'لقد بدأ السحب! اضغط على الزر أدناه للمشاركة. سيتم اختيار الفائز بشكل عشوائي من بين المشاركين عند رد المشرف على هذه الرسالة. حظ سعيد!',
    es:
      '¡La rifa ha comenzado! Presione el botón de abajo para participar. El ganador será seleccionado al azar de los participantes cuando un administrador responda a este mensaje. ¡Buena suerte!',
  },
  raffle_text_multiple: {
    ru:
      'Розыгрыш начался! Нажмите на кнопку ниже, чтобы принять участие. Победители будут выбраны случайным образом из участников, когда администраторы ответят на это сообщение. Желаю удачи!',
    en:
      'Raffle has begun! Press the button below to participate. The winners will be randomly selected from the participants when an admin replies to this message. Good luck!',
    pt:
      'O sorteio começou! Toque no botão abaixo para participar. Os vencedores serão selecionados aleatoriamente dentre os participantes quando um administrador responder a esta mensagem. Boa sorte!',
    tr:
      'Çekilis basladı! Katılmak için aşağıdaki butona basın. Bir yönetici bu mesaja cevap verdiğinde kazanan kişi, katılımcılar arasından rastgele olarak seçilecektir. İyi şanslar!',
    uk:
      'Розіграш розпочався! Натисніть на кнопку нижче, щоб взяти участь. Переможці будуть обрані випадковим чином з учасників, коли адміністратори дадуть відповідь на це повідомлення. Бажаю удачі!',
    ar:
      'لقد بدأ السحب! اضغط على الزر أدناه للمشاركة. سيتم اختيار الفائزين بشكل عشوائي من بين المشاركين عند رد المشرف على هذه الرسالة. حظ سعيد!',
    es:
      '¡La rifa ha comenzado! Presione el botón de abajo para participar. Los ganadores serán seleccionados al azar de los participantes cuando un administrador responda a este mensaje. ¡Buena suerte!',
  },
  please_retry: {
    ru: 'Пожалуйста, попробуйте через пару минут',
    en: 'Please, try in a couple of minutes',
    pt: 'Por favor, tente novamente daqui a alguns instantes',
    tr: 'Lütfen, birkaç dakika içerisinde tekrar deneyiniz',
    uk: 'Будь ласка, спробуйте за декілька хвилин',
    ar: 'من فضلك، حاول في بضع دقائق',
    es: 'Por favor, reintente en un par de minutos',
  },
  already_participating: {
    ru: 'Вы уже принимаете участие, отлично!',
    en: 'You are already participating, wonderful!',
    pt: 'Você já está participando. Muito bem!',
    tr: 'Zaten çekilişe katıldınız, geriye kazanmak kaldı!',
    uk: 'Ви вже берете участь, чудово!',
    ar: 'كنت تشارك بالفعل، رائع!',
    es: 'Ya estas participando, ¡maravilloso!',
  },
  participated: {
    ru: 'Отлично, вы отметились, как участник!',
    en: 'Great, you are now participating in this raffle!',
    pt: 'Muito bem, vocês agora está participando do sorteio!',
    tr: 'Harika, cekilişe katıldınız!',
    uk: 'Відмінно, ви відзначилися, як учасник!',
    ar: 'عظيم، أنت الآن تشارك في هذا السحب!',
    es: '¡Genial, ahora estás participando en este sorteo!',
  },
  participants_number: {
    ru: 'Количество участников',
    en: 'Number of participants',
    pt: 'Número de participantes',
    tr: 'Katılımcı sayısı',
    uk: 'Кількість учасників',
    ar: 'عدد المشاركين',
    es: 'Cantidad de participantes',
  },
  participate_button: {
    ru: 'Участвовать!',
    en: 'Participate!',
    pt: 'Participar!',
    tr: 'Katıl!',
    uk: 'Взяти участь!',
    ar: 'المشاركة!',
    es: '¡Participar!',
  },
  no_participants: {
    ru: 'В этот раз участников розыгрыша не было 😅',
    en: 'No participants this time 😅',
    pt: 'Sem participantes dessa vez 😅',
    tr: 'Katılımcı yok 😅',
    uk: 'Цього разу учасників розіграшу не було 😅',
    ar: 'لا يوجد مشاركون هذه المرة 😅',
    es: 'No hay suficientes participantes esta vez 😅',
  },
  winner: {
    ru: 'В этот раз победитель',
    en: 'The winner is',
    pt: 'O vencedor é',
    tr: 'Ve Kazanan kişi',
    uk: 'Цього разу переможець',
    ar: 'الفائز هو',
    es: 'El ganador es',
  },
  winners: {
    ru: 'В этот раз победители',
    en: 'The winners are',
    pt: 'Os ganhadores são',
    tr: 'Ve Kazanan kişiler',
    uk: 'Цього разу переможці',
    ar: 'الفائزون هم',
    es: 'Los ganadores son',
  },
  congratulations: {
    ru: 'Поздравляем',
    en: 'Congratulations',
    pt: 'Parabéns',
    tr: 'Tebrikler',
    uk: 'Вітаємо',
    ar: 'تهانينا',
    es: 'Felicidades',
  },
  raffle_over: {
    ru: 'Простите, но розыгрыш уже закончен',
    en: 'Sorry, the raffle is over now',
    pt: 'Pedimos desculpas, mas o sorteio terminou',
    tr: 'Üzgünüm, çekiliş şimdi bitti',
    uk: 'Вибачте, але розіграш вже завершено',
    ar: 'آسف، السحب إنتهى الآن',
    es: 'Lo siento, el sorteo ya terminó',
  },
  select_number: {
    ru: 'Пожалуйста, выберите, сколько победителей должно быть в розыгрыше',
    en: 'Please, select number of winners for a raffle',
    pt: 'Por favor selecione o número de ganhadores do sorteio',
    tr: 'Lütfen çekiliş için kazanacak kişi sayısını seçiniz',
    uk: 'Будь ласка, виберіть, скільки переможців має бути в розіграші',
    ar: 'من فضلك، اختر عدد الفائزين للسحب',
    es: 'Por favor, seleccione el número de ganadores para el sorteo',
  },
  number_selected: {
    ru: 'Отлично, вы выбрали количество победителей!',
    en: "Great! You've selected the number of winners!",
    pt: 'Ótimo! Você selecionou o número de ganhadores!',
    tr: 'Harika! Kazanacak kişi sayısını belirledin!',
    uk: 'Чудово, ви вибрали кількість переможців!',
    ar: 'رائع ! لقد اخترت عدد الفائزين!',
    es: '¡Excelente! ¡Has seleccionado el número de ganadores!',
  },
  not_enough_participants: {
    ru: 'В этот раз участников розыгрыша было недостаточно 😅',
    en: 'Not enough participants this time 😅',
    pt: 'Sem participantes suficientes 😅',
    tr: 'Çekiliş için yeteri kadar katılımcı yok 😅',
    uk: 'Цього разу учасників розіграшу було недостатньо 😅',
    ar: 'لا يكفي المشاركين هذه المرة 😅',
    es: 'No hay suficientes participantes esta vez 😅',
  },
  subscribe_format: {
    ru:
      'Пожалуйста, укажите хендл канала, на который надо проверять подписку, в формате `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`.',
    en:
      'Please, set the channel to check subscription to with the format `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`.',
    tr:
      'Lütfen, aboneliğini kontrol ettirmek istediğiniz kanalı/kanalları şu formatta belirleyiniz: `/subscribe @kameraonu`, `/subscribe @kanal_adi, @baska_kanal, @ve_baskabir_kanal`.',
    es:
      'Por favor, configure el canal para verificar la suscripción con el formato `/subscribe @channel_handle`, `/subscribe @channel_handle, @another_channel, @and_another_one`.',
  },
  nosubscribe_success: {
    ru: 'Ренди не будет проверять подписку на какой-либо канал.',
    en: 'Randy will not check subscription.',
    tr: 'Randy, artık aboneliği kontrol etmeyecek.',
    es: 'Randy no verificará la suscripción.',
  },
  bot_not_admin: {
    ru: 'Пожалуйста, сделайте @randymbot админом в этом чате.',
    en: 'Please make @randymbot an admin in this chat.',
    tr: 'Lütfen, @randymbot u yönetici yapın',
    es: 'Por favor, haga de @randymbot un administrador en este grupo.',
  },
  bot_not_admin_chat: {
    en: 'Please make @randymbot an admin in the chat ',
    tr: 'Lütfen, @randymbot u yönetici yapın',
    es: 'Por favor, haga de @randymbot un administrador en este chat.',
    ru: 'Пожалуйста, сделайте @randymbot админом в этом чате',
  },
  subscribe_success: {
    ru:
      'Отлично, теперь бот будет проверять подписку пользователя на следующий канал перед разрешением участвовать в конкурсе: ',
    en:
      'Great, now bot will check if the participant is subscribed to the following channel before allowing to participate: ',
    tr:
      'Harika! şimdi bot, katılımcının çekilişe katılmasına izin vermeden önce aşağıdaki kanala abone olup olmadığını kontrol edecek:',
    es:
      'Genial, ahora el bot verificará si el participante está suscrito al siguiente canal antes de permitir participar:',
  },
  check_subscription: {
    ru: 'Вы должны быть подписаны на ',
    en: 'You should be subscribed to ',
    tr: 'Abone olmalısınız ',
    es: 'Deberías estar suscrito',
  },
  raffle_message: {
    en:
      'Reply to this message to setup a custom raffle message. Make sure to reply to this message (we hope everyone knows what the word "reply" means by now). Make sure to include "$numberOfParticipants" without quotation marks in your message — it won\'t work without it. Cheers! 💪 The current raffle message (if set) is below.',
    tr:
      'Özel bir çekiliş mesajı ayarlamak için bu iletiyi yanıtlayın. Bu iletiyi yanıtladığınızdan emin olun (umarız herkes "yanıt" kelimesinin ne anlama geldiğini biliyordur). İletinizde tırnak işaretleri olmadan "$numberOfParticipants" mesajının geçtiğinden emin olun — onsuz çalışmaz. Kapiş! 💪 Geçerli çekiliş mesajı (ayarlanmışsa) aşağıdadır:',
    es:
      'Responda a este mensaje para configurar un mensaje de rifa personalizado. Asegúrese de responder a este mensaje (esperamos que todos sepan lo que significa la palabra "responder" en este momento). Asegúrese de incluir "$ numberOfParticipants" sin comillas en su mensaje; no funcionará sin él. ¡Saludos! 💪 El mensaje de la rifa actual (si está configurado) está debajo.',
    ru:
      'Ответьте на это сообщение, чтобы установить новое сообщение розыгрыша. Именно ответьте (надеемся, что все понимают разницу между обычным сообщением и ответом). Обязательно используйте "$numberOfParticipants" без кавычек в сообщении — иначе установка не сработает. Удачи! 💪 Текущее сообщение (если оно установленно), приведено ниже.',
  },
  raffle_message_off: {
    ru: 'Теперь Ренди будет использовать стандартное сообщение о розыгрыше.',
    en: 'Randy will use standard raffle message now.',
    tr: 'Randy, artık varsayılan çekiliş mesajını kullanacak.',
    es: 'Randy usará el mensaje estándar de la rifa ahora.',
  },
  winner_message: {
    en:
      'Reply to this message to setup a custom winner message. Make sure to reply to this message (we hope everyone knows what the word "reply" means by now). Make sure to include "$numberOfParticipants" and "$winner" without quotation marks in your message — it won\'t work without it. Cheers! 🎉 The current winner message (if set) is below.',
    tr:
      'Özel bir kazanan mesajı ayarlamak için bu iletiyi yanıtlayın. Bu iletiyi yanıtladığınızdan emin olun (umarız herkes "yanıt" kelimesinin ne anlama geldiğini biliyordur). İletinizde tırnak işaretleri olmadan  "$numberOfParticipants" ve "$winner" mesajının geçtiğinden emin olun —  onlarsız çalışmaz. Kapiş! 🎉 Geçerli kazanan mesajı (ayarlanmışsa) aşağıdadır:',
    es:
      'Responda a este mensaje para configurar un mensaje de ganador personalizado. Asegúrese de responder a este mensaje (esperamos que todos sepan lo que significa la palabra "responder" en este momento). Asegúrese de incluir "$ numberOfParticipants" y "$ ganador" sin comillas en su mensaje; no funcionará sin él. ¡Saludos! 🎉 El mensaje del ganador actual (si está configurado) está debajo.',
    ru:
      'Ответьте на это сообщение, чтобы установить новое сообщение о победе. Именно ответьте (надеемся, что все понимают разницу между обычным сообщением и ответом). Обязательно используйте "$numberOfParticipants" и "$winner" без кавычек в сообщении — иначе установка не сработает. Удачи! 🎉 Текущее сообщение (если оно установленно), приведено ниже.',
  },
  winner_message_off: {
    ru: 'Теперь Ренди будет использовать стандартное сообщение о победе.',
    en: 'Randy will use standard winner message now.',
    tr: 'Randy, artık varsayılan kazanan mesajını kullanacak.',
    es: 'Randy usará el mensaje estándar del ganador ahora.',
  },
  success: {
    ru: 'Успех!',
    en: 'Success!',
    tr: 'Başarılı!',
    es: '¡Logrado!',
  },
  nodelete_true: {
    ru: 'Теперь Ренди не будет редактировать (удалять) оригинальное сообщение.',
    en: 'Now Randy will not edit (delete) original message.',
    es: 'Ahora Randy no editará (eliminará) el mensaje original.',
    tr: 'Randy artık orijinal mesajı düzenlemeyecek (silmeyecek).',
  },
  nodelete_false: {
    ru: 'Теперь Ренди будет редактировать (удалять) оригинальное сообщение.',
    en: 'Now Randy will edit (delete) original message.',
    es: 'Ahora Randy editará (eliminará) el mensaje original.',
    tr: 'Randy artık orijinal mesajı düzenleyecek (silecek).',
  },
  mustBeAnAdmin: {
    en: 'You have to be an admin in the chat',
    ru: 'Вы должны быть админом в чате',
  },
  config_raffle_instructions: {
    en:
      'Success! Now select the chat or the channel you want to configure with /configRaffle',
    ru:
      'Успех! Теперь выберите канал или чат, который хотите настроить, при помощи команды /configRaffle',
  },
  config_raffle_no_chats: {
    en:
      'First, forward me a message from a channel or a chat you want to configure',
    ru:
      'Сначала перешлите мне форвард сообщения из чата или канала, который хотите настроить',
  },
  select_chat: {
    en: 'Select a chat or a channel to configure',
    ru: 'Выберите чат или канал, который хотите настроить',
  },
  private_messages: {
    en: 'Private messages',
    ru: 'Приватные сообщения',
  },
  now_editing_this_chat: {
    en: 'Great! Now you are editting the config of this chat',
    ru: 'Отлично! Теперь вы редактируете настройки этого чата',
  },
  promos_privacy: {
    en: "In groups, Randy may add one button under a raffle's winners that points to another bot by the same maker, picked by matching the raffle's message and the reply that ends it to that bot's topic. The text is only matched in memory and is never stored or logged for this, and it happens at most once a week per group across all our bots, never in channels. Group admins can turn this off with /promos off.",
    ru: "В группах Randy может добавить под победителями розыгрыша одну кнопку другого бота того же автора, если слова сообщения розыгрыша и ответа, который его завершает, совпадают с темой этого бота. Текст для этого сверяется только в памяти и никогда не сохраняется и не попадает в логи, а кнопка появляется не чаще раза в неделю на группу во всех наших ботах вместе и никогда в каналах. Админы группы могут выключить это командой /promos off.",
    uk: "У групах Randy може додати під переможцями розіграшу одну кнопку іншого бота того ж автора, якщо слова повідомлення розіграшу й відповіді, що його завершує, збігаються з темою цього бота. Текст для цього звіряється лише в пам'яті й ніколи не зберігається і не потрапляє в логи, а кнопка з'являється не частіше разу на тиждень на групу в усіх наших ботах разом і ніколи в каналах. Адміни групи можуть вимкнути це командою /promos off.",
  },
  promos_help: {
    en: "/promos — Turn buttons for our other bots in this group on or off\n/privacy — How Randy handles your data",
    ru: "/promos — Включить или выключить кнопки других наших ботов в этой группе\n/privacy — Как Randy обращается с данными",
    uk: "/promos — Увімкнути або вимкнути кнопки інших наших ботів у цій групі\n/privacy — Як Randy поводиться з даними",
  },
  promos_status_on: {
    en: "📣 Randy may add one button for another bot by the same maker under a raffle's winners in this group, at most once a week, when the raffle is about that bot's topic. Group admins can turn this off with /promos off.",
    ru: "📣 Randy может добавить под победителями розыгрыша в этой группе одну кнопку другого бота того же автора, не чаще раза в неделю, если розыгрыш касается темы этого бота. Админы группы могут выключить это командой /promos off.",
    uk: "📣 Randy може додати під переможцями розіграшу в цій групі одну кнопку іншого бота того ж автора, не частіше разу на тиждень, якщо розіграш стосується теми цього бота. Адміни групи можуть вимкнути це командою /promos off.",
  },
  promos_status_off: {
    en: "🔕 Buttons for other bots are off in this group. Group admins can turn them back on with /promos on.",
    ru: "🔕 Кнопки других ботов в этой группе выключены. Админы группы могут включить их снова командой /promos on.",
    uk: "🔕 Кнопки інших ботів у цій групі вимкнені. Адміни групи можуть увімкнути їх знову командою /promos on.",
  },
  promos_off: {
    en: "🔕 Done: Randy won't add buttons for other bots in this group.",
    ru: "🔕 Готово: Randy не будет добавлять кнопки других ботов в этой группе.",
    uk: "🔕 Готово: Randy не додаватиме кнопки інших ботів у цій групі.",
  },
  promos_on: {
    en: "📣 Done: Randy may again add a button for another bot by the same maker under a raffle's winners, at most once a week.",
    ru: "📣 Готово: Randy снова может добавить под победителями розыгрыша кнопку другого бота того же автора, не чаще раза в неделю.",
    uk: "📣 Готово: Randy знову може додати під переможцями розіграшу кнопку іншого бота того ж автора, не частіше разу на тиждень.",
  },
  promos_error: {
    en: "😥 Randy couldn't do that. Please try again later.",
    ru: "😥 Randy не удалось это сделать. Попробуйте позже.",
    uk: "😥 Randy не вдалося це зробити. Спробуйте пізніше.",
  },
  promos_group_only: {
    en: "😅 This command only works in group chats.",
    ru: "😅 Эта команда работает только в групповых чатах.",
    uk: "😅 Ця команда працює лише в групових чатах.",
  },
}
