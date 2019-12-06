export function loc(text: string, language: string) {
  return localizations[text][language]
}

export const localizations: { [index: string]: { [index: string]: string } } = {
  private_help_start: {
    ru:
      'Привет! Это Рэнди Марш. Я умею случайным образом выбирать участника чата или канала из тех, что нажали на кнопку "Участвовать". Мой исходный код [вот тут](https://github.com/backmeupplz/randymbot). Сменить язык можно командой /language. Сменить количество победителей (стандартно — 1) командой /number (можно использовать в формате `/number 100`).\n\n1. Добавьте меня на канал или в чат, отправьте команду /randy и начнется розыгрыш.\n2. Ответьте на сообщение о розыгрыше любым сообщением, и розыгрыш завершится, а победитель будет выбран из участников.\n\nЕсли вы хотите проверять подписку на определенный канал перед тем, как разрешить человеку участвовать, настройте эту функцию командой в формате `/subscribe @channel_handle`. Если вы хотите отключить эту функцию, напишите /nosubscribe. Хотите настроить собственное сообщение о розыгрыше? Используйте /raffleMessage. Хотите использовать обычное сообщение о розыгрыше? Используйте /noRaffleMessage.\n\nОстались вопросы? Почитайте наш канал поддержки — @borodutch\\_support 🦄 P.S., если вы хотите поддержать этого бота, пожалуйста, донатьте через [программу GitHub Sponsors вот тут](https://github.com/sponsors/backmeupplz).',
    en:
      'Hi there! I\'m Randy Marsh. I can randomly select a raffle participant (that hit the "Participate" button) in a chat or a channel. My source code is [here](https://github.com/backmeupplz/randymbot). You can also change the /language and the /number of winners per raffle (default is 1, you can use format `/number 100`).\n\n1. Add me to a channel or a chat, send /randy command and the raffle will begin.\n2. Reply with any message to my raffle message to finish the raffle, and a random winner will be picked from the participants.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nStill got questions? Go to our support channel — @borodutch\\_support 🦄 P.S., if you want to help this bot, please, donate through the [GitHub Sponsors program here](https://github.com/sponsors/backmeupplz).',
    pt:
      'Olá! Eu sou Randy Marsh. Eu posso selecionar aleatoriamente um participante de sorteio (quem clica no botão "Participar") em um grupo ou canal. Meu código-fonte está [aqui] (https://github.com/backmeupplz/randymbot). Você também pode alterar o idioma em /language e o número de ganhadores em cada sorteio (o padrão é 1) com o comando /number.\n\n1. Me adicione a um canal ou a um grupo, envie o comando /randy e o sorteio começa.\n2. Responda com qualquer mensagem à minha mensagem de sorteio para terminá-lo e um vencedor será escolhido aleatoriamente será escolhido dentre os participantes.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nAinda tem perguntas? Visite nosso canal de suporte — @borodutch\\_ support 🦄 P.S., if you want to help this bot, please, donate through the [GitHub Sponsors program here](https://github.com/sponsors/backmeupplz).',
    tr:
      'Merhaba! Ben Randy Marsh. Bir sohbet veya kanalda rastgele bir cekilis katilimcisini ("Katil" dugmesine basan) secebilirim. Kaynak kodum [burada](https://github.com/backmeupplz/randymbot). Ayrica /language ile botun dilini ve /number ile cekilisi kazanacak kisi sayisini da degistirebilirsiniz (varsayilan 1).\n\n1. Beni bir kanala veya gruba ekle, /randy komutunu gonder ve cekilis baslasin!\n2. Cekilisi bitirmek icin cekilis iletime herhangi bir mesajla yanit verin ve katilimcilardan rastgele bir kazanan secilecektir.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nBaska sorularin mi var? Destek kanalimiza gelin — @borodutch\\_support 🦄 P.S., if you want to help this bot, please, donate through the [GitHub Sponsors program here](https://github.com/sponsors/backmeupplz).',
    uk:
      'Привіт! Це Ренді Марш. Я вмію випадковим чином вибирати учасника чату або каналу з тих, що натиснули на кнопку "Взяти участь". Мій вихідний код [ось тут](https://github.com/backmeupplz/randymbot). Змінити мову можна командою /language. Змінити кількість переможців (стандартно — 1) командою /number.\n\n1. Додайте мене на канал або в чат, надішліть команду /randy і почнеться розіграш.\n2. Дайте відповідь на повідомлення про розіграш будь-яким повідомленням, і розіграш завершиться, а переможець буде обраний з учасників.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nЗалишилися питання? Почитайте наш канал підтримки — @borodutch\\_support 🦄 P.S., if you want to help this bot, please, donate through the [GitHub Sponsors program here](https://github.com/sponsors/backmeupplz).',
    ar:
      'مرحبًا بكم! (أنا (راندي مارش يمكنني اختيار مشارك السحب عشوائياً (الذي ضغط زر "المشاركة") في مجموعة أو قناة. رمز مصدري هو [هنا](https://github.com/backmeupplz/randymbot). يمكنك أيضًا تغيير اللغة /language وعدد الفائزين لكل سحب /number (الافتراضي هو 1، يمكنك استخدام تنسيق /number 100).\n\n1. إضافة لي إلى قناة أو مجموعة ، وإرسال الأمر /randy والسحب سيبدأ.\n2. الرد مع أي رسالة إلى رسالة السحب الخاصة بي لإنهاء السحب، وسيتم اختيار الفائز العشوائي من المشاركين.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nأمازلت تملك أسئلة؟ انتقل إلى قناة الدعم الخاصة بنا — @borodutch\\_support 🦄 P.S., if you want to help this bot, please, donate through the [GitHub Sponsors program here](https://github.com/sponsors/backmeupplz).',
  },
  public_help_start: {
    ru:
      'Привет! Это Рэнди Марш. Я умею случайным образом выбирать участника чата или канала из тех, что нажали на кнопку "Участвовать". Мой исходный код [вот тут](https://github.com/backmeupplz/randymbot). Сменить язык можно командой /language. Сменить количество победителей (стандартно — 1) командой /number (можете использовать формат `/number 100`).\n\n1. Отправьте команду /randy и начнется розыгрыш.\n2. Ответьте на сообщение о розыгрыше любым сообщением, и розыгрыш завершится, а победитель будет выбран из участников.\n\nЕсли вы хотите проверять подписку на определенный канал перед тем, как разрешить человеку участвовать, настройте эту функцию командой в формате `/subscribe @channel_handle`. Если вы хотите отключить эту функцию, напишите /nosubscribe. Хотите настроить собственное сообщение о розыгрыше? Используйте /raffleMessage. Хотите использовать обычное сообщение о розыгрыше? Используйте /noRaffleMessage.\n\nОстались вопросы? Почитайте наш канал поддержки — @borodutch\\_support 🦄',
    en:
      'Hi there! I\'m Randy Marsh. I can randomly select a raffle participant (that hit the "Participate" button) in a chat or a channel. My source code is [here](https://github.com/backmeupplz/randymbot). You can also change the /language the /number of winners per raffle (default is 1, you can use format `/number 100`).\n\n1. Send /randy command and the raffle will begin.\n2. Reply with any message to my raffle message to finish the raffle, and a random winner will be picked from the participants.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nStill got questions? Go to our support channel — @borodutch\\_support 🦄',
    pt:
      'Olá! Eu sou Randy Marsh. Eu posso selecionar aleatoriamente um participante de sorteio (quem clica no botão "Participar") em um grupo ou canal. Meu código-fonte está [aqui] (https://github.com/backmeupplz/randymbot). Você também pode alterar o idioma em /language e o número de ganhadores em cada sorteio (o padrão é 1) com o comando /number.\n\n1. Me adicione a um canal ou a um grupo, envie o comando /randy e o sorteio começa.\n2. Responda com qualquer mensagem à minha mensagem de sorteio para terminá-lo e um vencedor será escolhido aleatoriamente será escolhido dentre os participantes.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nAinda tem perguntas? Visite nosso canal de suporte — @borodutch\\_support 🦄',
    tr:
      'Merhaba! Ben Randy Marsh. Bir sohbet veya kanalda rastgele bir cekilis katilimcisini ("Katil" dugmesine basan) secebilirim. Kaynak kodum [burada](https://github.com/backmeupplz/randymbot). Ayrica /language ile botun dilini ve /number ile cekilisi kazanacak kisi sayisini da degistirebilirsiniz (varsayilan 1).\n\n1. Beni bir kanala veya gruba ekle, /randy komutunu gonder ve cekilis baslasin!\n2. Cekilisi bitirmek icin cekilis iletime herhangi bir mesajla yanit verin ve katilimcilardan rastgele bir kazanan secilecektir.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nBaska sorularin mi var? Destek kanalimiza gelin — @borodutch\\_support 🦄',
    uk:
      'Привіт! Це Ренді Марш. Я вмію випадковим чином вибирати учасника чату або каналу з тих, що натиснули на кнопку "Взяти участь". Мій вихідний код [ось тут](https://github.com/backmeupplz/randymbot). Змінити мову можна командою /language. Змінити кількість переможців (стандартно — 1) командою /number.\n\n1. Надішліть команду /randy і почнеться розіграш.\n2. Дайте відповідь на повідомлення про розіграш будь-яким повідомленням, і розіграш завершиться, а переможець буде обраний з учасників.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nЗалишилися питання? Почитайте наш канал підтримки — @borodutch\\_support 🦄',
    ar:
      'مرحبًا بكم! (أنا (راندي مارش يمكنني اختيار مشارك السحب عشوائياً (الذي ضغط زر "المشاركة") في مجموعة أو قناة. رمز مصدري هو [هنا](https://github.com/backmeupplz/randymbot). يمكنك أيضًا تغيير اللغة /language وعدد الفائزين لكل سحب /number (الافتراضي هو 1، يمكنك استخدام تنسيق /number 100).\n\n1. إضافة لي إلى قناة أو مجموعة ، وإرسال الأمر /randy والسحب سيبدأ.\n2. الرد مع أي رسالة إلى رسالة السحب الخاصة بي لإنهاء السحب، وسيتم اختيار الفائز العشوائي من المشاركين.\n\nIf you want to check whether a user is subscribed to a particular channel you can set up the bot with the following format `/subscribe @channel_handle`. If you want to turn it off, use /nosubscribe. Want to set custom raffle message? Use /raffleMessage. Want to use default raffle message? Use /noRaffleMessage.\n\nأمازلت تملك أسئلة؟ انتقل إلى قناة الدعم الخاصة بنا — @borodutch\\_support 🦄',
  },
  no_work_private: {
    ru: 'Простите, но эта команда не работает в личке с ботом.',
    en: 'Sorry, but this command is not available in private messages.',
    pt: 'Desculpe, mas este comando não está disponível em conversas privadas.',
    tr: 'Uzgunum, bu komut ozel mesajlarda mevcut degil.',
    uk: 'Вибачте, але ця команда не працює в діалозі з ботом.',
    ar: 'عذراً، ولكن هذا الأمر غير متوفر في الرسائل الخاصة.',
  },
  select_language: {
    ru: 'Пожалуйста, выберите язык',
    en: 'Please, select the language',
    pt: 'Por favor, escolha o idioma',
    tr: 'Lutfen dilinizi seciniz',
    uk: 'Будь ласка, оберіть мову',
    ar: 'الرجاء تحديد اللغة',
  },
  language_selected: {
    ru: 'Спасибо, теперь я говорю по-русски!',
    en: 'Thank you! Now I speak English',
    pt: 'Obrigado! Agora eu falarei português',
    tr: 'Tesekkurler! Artik Turkce konusuyorum',
    uk: 'Дякую, тепер я говорю українською!',
    ar: 'شكرا! الآن أنا أتكلم العربية',
  },
  raffle_text: {
    ru:
      'Розыгрыш начался! Нажмите на кнопку ниже, чтобы принять участие. Победитель будет выбран случайным образом из участников, когда администраторы ответят на это сообщение. Желаю удачи!',
    en:
      'Raffle has begun! Press the button below to participate. The winner will be randomly selected from the participants when an admin replies to this message. Good luck!',
    pt:
      'O sorteio começou! Toque no botão abaixo para participar. O vencedor será selecionado aleatoriamente dentre participantes quando um administrador responder a essa mensagem. Boa sorte!',
    tr:
      'Cekilis basladi! Katilmak icin asagidaki dugmeye basin. Bir yonetici bu mesaja cevap verdiginde kazanan kisi, katilimcilar arasindan rastgele olarak secilecektir. Iyi sanslar!',
    uk:
      'Розіграш розпочався! Натисніть на кнопку нижче, щоб взяти участь. Переможець буде обраний випадковим чином з учасників, коли адміністратори дадуть відповідь на це повідомлення. Бажаю удачі!',
    ar:
      'لقد بدأ السحب! اضغط على الزر أدناه للمشاركة. سيتم اختيار الفائز بشكل عشوائي من بين المشاركين عند رد المشرف على هذه الرسالة. حظ سعيد!',
  },
  raffle_text_multiple: {
    ru:
      'Розыгрыш начался! Нажмите на кнопку ниже, чтобы принять участие. Победители будут выбраны случайным образом из участников, когда администраторы ответят на это сообщение. Желаю удачи!',
    en:
      'Raffle has begun! Press the button below to participate. The winners will be randomly selected from the participants when an admin replies to this message. Good luck!',
    pt:
      'O sorteio começou! Toque no botão abaixo para participar. Os vencedores serão selecionados aleatoriamente dentre os participantes quando um administrador responder a esta mensagem. Boa sorte!',
    tr:
      'Cekilis basladi! Katilmak icin asagidaki dugmeye basin. Bir yonetici bu mesaja cevap verdiginde kazanan kisi, katilimcilar arasindan rastgele olarak secilecektir. Iyi sanslar!',
    uk:
      'Розіграш розпочався! Натисніть на кнопку нижче, щоб взяти участь. Переможці будуть обрані випадковим чином з учасників, коли адміністратори дадуть відповідь на це повідомлення. Бажаю удачі!',
    ar:
      'لقد بدأ السحب! اضغط على الزر أدناه للمشاركة. سيتم اختيار الفائزين بشكل عشوائي من بين المشاركين عند رد المشرف على هذه الرسالة. حظ سعيد!',
  },
  please_retry: {
    ru: 'Пожалуйста, попробуйте через пару минут',
    en: 'Please, try in a couple of minutes',
    pt: 'Por favor, tente novamente daqui a alguns instantes',
    tr: 'Lutfen birkac dakika icinde tekrar deneyiniz',
    uk: 'Будь ласка, спробуйте за декілька хвилин',
    ar: 'من فضلك، حاول في بضع دقائق',
  },
  already_participating: {
    ru: 'Вы уже принимаете участие, отлично!',
    en: 'You are already participating, wonderful!',
    pt: 'Você já está participando. Muito bem!',
    tr: 'Zaten cekilise katildiniz, geriye kazanmak kaldi!',
    uk: 'Ви вже берете участь, чудово!',
    ar: 'كنت تشارك بالفعل، رائع!',
  },
  participated: {
    ru: 'Отлично, вы отметились, как участник!',
    en: 'Great, you are now participating in this raffle!',
    pt: 'Muito bem, vocês agora está participando do sorteio!',
    tr: 'Harika, cekilise katildiniz!',
    uk: 'Відмінно, ви відзначилися, як учасник!',
    ar: 'عظيم، أنت الآن تشارك في هذا السحب!',
  },
  participants_number: {
    ru: 'Количество участников',
    en: 'Number of participants',
    pt: 'Número de participantes',
    tr: 'Katilimci sayisi',
    uk: 'Кількість учасників',
    ar: 'عدد المشاركين',
  },
  participate_button: {
    ru: 'Участвовать!',
    en: 'Participate!',
    pt: 'Participar!',
    tr: 'Katil!',
    uk: 'Взяти участь!',
    ar: 'المشاركة!',
  },
  no_participants: {
    ru: 'В этот раз участников розыгрыша не было 😅',
    en: 'No participants this time 😅',
    pt: 'Sem participantes dessa vez 😅',
    tr: 'Katilimci yok 😅',
    uk: 'Цього разу учасників розіграшу не було 😅',
    ar: 'لا يوجد مشاركون هذه المرة 😅',
  },
  winner: {
    ru: 'В этот раз победитель',
    en: 'The winner is',
    pt: 'O vencedor é',
    tr: 'Ve Kazanan kisi',
    uk: 'Цього разу переможець',
    ar: 'الفائز هو',
  },
  winners: {
    ru: 'В этот раз победители',
    en: 'The winners are',
    pt: 'Os ganhadores são',
    tr: 'Ve Kazanan kisilerr',
    uk: 'Цього разу переможці',
    ar: 'الفائزون هم',
  },
  congratulations: {
    ru: 'Поздравляем',
    en: 'Congratulations',
    pt: 'Parabéns',
    tr: 'Tebrikler',
    uk: 'Вітаємо',
    ar: 'تهانينا',
  },
  raffle_over: {
    ru: 'Простите, но розыгрыш уже закончен',
    en: 'Sorry, the raffle is over now',
    pt: 'Pedimos desculpas, mas o sorteio terminou',
    tr: 'Uzgunum, cekilis simdi bitti',
    uk: 'Вибачте, але розіграш вже завершено',
    ar: 'آسف، السحب إنتهى الآن',
  },
  select_number: {
    ru: 'Пожалуйста, выберите, сколько победителей должно быть в розыгрыше',
    en: 'Please, select number of winners for a raffle',
    pt: 'Por favor selecione o número de ganhadores do sorteio',
    tr: 'Lutfen cekilis icin kazanacak kisi sayisini seciniz',
    uk: 'Будь ласка, виберіть, скільки переможців має бути в розіграші',
    ar: 'من فضلك، اختر عدد الفائزين للسحب',
  },
  number_selected: {
    ru: 'Отлично, вы выбрали количество победителей!',
    en: "Great! You've selected the number of winners!",
    pt: 'Ótimo! Você selecionou o número de ganhadores!',
    tr: 'Harika! Kazanacak kisi sayisini sectin!',
    uk: 'Чудово, ви вибрали кількість переможців!',
    ar: 'رائع ! لقد اخترت عدد الفائزين!',
  },
  not_enough_participants: {
    ru: 'В этот раз участников розыгрыша было недостаточно 😅',
    en: 'Not enough participants this time 😅',
    pt: 'Sem participantes suficientes 😅',
    tr: 'Cekilis icin yeteri kadar katilimci yok 😅',
    uk: 'Цього разу учасників розіграшу було недостатньо 😅',
    ar: 'لا يكفي المشاركين هذه المرة 😅',
  },
  subscribe_format: {
    ru:
      'Пожалуйста, укажите хендл канала, на который надо проверять подписку, в формате `/subscribe @channel_handle`.',
    en:
      'Please, set the channel to check subscription to with the format `/subscribe @channel_handle`.',
    pt:
      'Please, set the channel to check subscription to with the format `/subscribe @channel_handle`.',
    tr:
      'Please, set the channel to check subscription to with the format `/subscribe @channel_handle`.',
    uk:
      'Please, set the channel to check subscription to with the format `/subscribe @channel_handle`.',
    ar:
      'Please, set the channel to check subscription to with the format `/subscribe @channel_handle`.',
  },
  nosubscribe_success: {
    ru: 'Ренди не будет проверять подписку на какой-либо канал.',
    en: 'Randy will not check subscription.',
    pt: 'Randy will not check subscription.',
    tr: 'Randy will not check subscription.',
    uk: 'Randy will not check subscription.',
    ar: 'Randy will not check subscription.',
  },
  bot_not_admin: {
    ru: 'Пожалуйста, сделайте @randymbot админом в этом чате.',
    en: 'Please make @randymbot an admin in this chat.',
    pt: 'Please make @randymbot an admin in this chat.',
    tr: 'Please make @randymbot an admin in this chat.',
    uk: 'Please make @randymbot an admin in this chat.',
    ar: 'Please make @randymbot an admin in this chat.',
  },
  bot_not_admin_chat: {
    ru: 'Пожалуйста, сделайте @randymbot админом чате ',
    en: 'Please make @randymbot an admin in the chat ',
    pt: 'Please make @randymbot an admin in the chat ',
    tr: 'Please make @randymbot an admin in the chat ',
    uk: 'Please make @randymbot an admin in the chat ',
    ar: 'Please make @randymbot an admin in the chat ',
  },
  subscribe_success: {
    ru:
      'Отлично, теперь бот будет проверять подписку пользователя на следующий канал перед разрешением участвовать в конкурсе: ',
    en:
      'Great, now bot will check if the participant is subscribed to the following channel before allowing to participate: ',
    pt:
      'Great, now bot will check if the participant is subscribed to the following channel before allowing to participate: ',
    tr:
      'Great, now bot will check if the participant is subscribed to the following channel before allowing to participate: ',
    uk:
      'Great, now bot will check if the participant is subscribed to the following channel before allowing to participate: ',
    ar:
      'Great, now bot will check if the participant is subscribed to the following channel before allowing to participate: ',
  },
  check_subscription: {
    ru: 'Вы должны быть подписаны на ',
    en: 'You should be subscribed to ',
    pt: 'You should be subscribed to ',
    tr: 'You should be subscribed to ',
    uk: 'You should be subscribed to ',
    ar: 'You should be subscribed to ',
  },
  raffle_message: {
    ru:
      'Ответьте на это сообщение, чтобы установить новое сообщение розыгрыша. Именно ответьте (надеемся, что все понимают разницу между обычным сообщение и ответом). Обязательно используйте "$numberOfParticipants" в сообщении — иначе установка не сработает. Удачи! 💪 Текущее сообщение (если оно установленно), приведено ниже.',
    en:
      'Reply to this message to setup a custom raffle message. Make sure to reply to this message (we hope everyone knows what the word "reply" means by now). Make sure to include "$numberOfParticipants" without quotation marks in your message — it won\'t work without it. Cheers! 💪 The current raffle message (if set) is below.',
    pt:
      'Reply to this message to setup a custom raffle message. Make sure to reply to this message (we hope everyone knows what the word "reply" means by now). Make sure to include "$numberOfParticipants" without quotation marks in your message — it won\'t work without it. Cheers! 💪 The current raffle message (if set) is below.',
    tr:
      'Reply to this message to setup a custom raffle message. Make sure to reply to this message (we hope everyone knows what the word "reply" means by now). Make sure to include "$numberOfParticipants" without quotation marks in your message — it won\'t work without it. Cheers! 💪 The current raffle message (if set) is below.',
    uk:
      'Reply to this message to setup a custom raffle message. Make sure to reply to this message (we hope everyone knows what the word "reply" means by now). Make sure to include "$numberOfParticipants" without quotation marks in your message — it won\'t work without it. Cheers! 💪 The current raffle message (if set) is below.',
    ar:
      'Reply to this message to setup a custom raffle message. Make sure to reply to this message (we hope everyone knows what the word "reply" means by now). Make sure to include "$numberOfParticipants" without quotation marks in your message — it won\'t work without it. Cheers! 💪 The current raffle message (if set) is below.',
  },
  raffle_message_off: {
    ru: 'Теперь Ренди будет использовать стандартное сообщение о розыгрыше.',
    en: 'Randy will use standard raffle message now.',
    pt: 'Randy will use standard raffle message now.',
    tr: 'Randy will use standard raffle message now.',
    uk: 'Randy will use standard raffle message now.',
    ar: 'Randy will use standard raffle message now.',
  },
  success: {
    ru: 'Успех!',
    en: 'Success!',
    pt: 'Success!',
    tr: 'Success!',
    uk: 'Success!',
    ar: 'Success!',
  },
}
