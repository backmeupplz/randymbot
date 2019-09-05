export function loc(text: string, language: string) {
  return localizations[text][language]
}

const localizations: { [index: string]: { [index: string]: string } } = {
  private_help_start: {
    ru:
      'Привет! Это Рэнди Марш. Я умею случайным образом выбирать участника чата или канала из тех, что нажали на кнопку "Участвовать". Мой исходный код [вот тут](https://github.com/backmeupplz/randymbot). Сменить язык можно командой /language. Сменить количество победителей (стандартно — 1) командой /number (можно использовать в формате `/number 100`).\n\n1. Добавьте меня на канал или в чат, отправьте команду /randy и начнется розыгрыш.\n2. Ответьте на сообщение о розыгрыше любым сообщением, и розыгрыш завершится, а победитель будет выбран из участников.\n\nОстались вопросы? Почитайте наш канал поддержки — @borodutch\\_support 🦄',
    en:
      'Hi there! I\'m Randy Marsh. I can randomly select a raffle participant (that hit the "Participate" button) in a chat or a channel. My source code is [here](https://github.com/backmeupplz/randymbot). You can also change the /language and the /number of winners per raffle (default is 1, you can use format `/number 100`).\n\n1. Add me to a channel or a chat, send /randy command and the raffle will begin.\n2. Reply with any message to my raffle message to finish the raffle, and a random winner will be picked from the participants.\n\nStill got questions? Go to our support channel — @borodutch\\_support 🦄',
    pt:
      'Olá! Eu sou Randy Marsh. Eu posso selecionar aleatoriamente um participante de sorteio (quem clica no botão "Participar") em um grupo ou canal. Meu código-fonte está [aqui] (https://github.com/backmeupplz/randymbot). Você também pode alterar o idioma em /language e o número de ganhadores em cada sorteio (o padrão é 1) com o comando /number.\n\n1. Me adicione a um canal ou a um grupo, envie o comando /randy e o sorteio começa.\n2. Responda com qualquer mensagem à minha mensagem de sorteio para terminá-lo e um vencedor será escolhido aleatoriamente será escolhido dentre os participantes.\n\nAinda tem perguntas? Visite nosso canal de suporte - @borodutch\\_ support 🦄',
    tr:
      'Merhaba! Ben Randy Marsh. Bir sohbet veya kanalda rastgele bir cekilis katilimcisini ("Katil" dugmesine basan) secebilirim. Kaynak kodum [burada](https://github.com/backmeupplz/randymbot). Ayrica /language ile botun dilini ve /number ile cekilisi kazanacak kisi sayisini da degistirebilirsiniz (varsayilan 1).\n\n1. Beni bir kanala veya gruba ekle, /randy komutunu gonder ve cekilis baslasin!\n2. Cekilisi bitirmek icin cekilis iletime herhangi bir mesajla yanit verin ve katilimcilardan rastgele bir kazanan secilecektir.\n\nBaska sorularin mi var? Destek kanalimiza gelin — @borodutch\\_support 🦄',
    uk:
      'Привіт! Це Ренді Марш. Я вмію випадковим чином вибирати учасника чату або каналу з тих, що натиснули на кнопку "Взяти участь". Мій вихідний код [ось тут](https://github.com/backmeupplz/randymbot). Змінити мову можна командою /language. Змінити кількість переможців (стандартно — 1) командою /number.\n\n1. Додайте мене на канал або в чат, надішліть команду /randy і почнеться розіграш.\n2. Дайте відповідь на повідомлення про розіграш будь-яким повідомленням, і розіграш завершиться, а переможець буде обраний з учасників.\n\nЗалишилися питання? Почитайте наш канал підтримки — @borodutch\\_support 🦄',
  },
  public_help_start: {
    ru:
      'Привет! Это Рэнди Марш. Я умею случайным образом выбирать участника чата или канала из тех, что нажали на кнопку "Участвовать". Мой исходный код [вот тут](https://github.com/backmeupplz/randymbot). Сменить язык можно командой /language. Сменить количество победителей (стандартно — 1) командой /number (можете использовать формат `/number 100`).\n\n1. Отправьте команду /randy и начнется розыгрыш.\n2. Ответьте на сообщение о розыгрыше любым сообщением, и розыгрыш завершится, а победитель будет выбран из участников.\n\nОстались вопросы? Почитайте наш канал поддержки — @borodutch_support 🦄',
    en:
      'Hi there! I\'m Randy Marsh. I can randomly select a raffle participant (that hit the "Participate" button) in a chat or a channel. My source code is [here](https://github.com/backmeupplz/randymbot). You can also change the /language the /number of winners per raffle (default is 1, you can use format `/number 100`).\n\n1. Send /randy command and the raffle will begin.\n2. Reply with any message to my raffle message to finish the raffle, and a random winner will be picked from the participants.\n\nStill got questions? Go to our support channel — @borodutch\\_support 🦄',
    pt:
      'Olá! Eu sou Randy Marsh. Eu posso selecionar aleatoriamente um participante de sorteio (quem clica no botão "Participar") em um grupo ou canal. Meu código-fonte está [aqui] (https://github.com/backmeupplz/randymbot). Você também pode alterar o idioma em /language e o número de ganhadores em cada sorteio (o padrão é 1) com o comando /number.\n\n1. Me adicione a um canal ou a um grupo, envie o comando /randy e o sorteio começa.\n2. Responda com qualquer mensagem à minha mensagem de sorteio para terminá-lo e um vencedor será escolhido aleatoriamente será escolhido dentre os participantes.\n\nAinda tem perguntas? Visite nosso canal de suporte - @borodutch\\_ support 🦄',
    tr:
      'Merhaba! Ben Randy Marsh. Bir sohbet veya kanalda rastgele bir cekilis katilimcisini ("Katil" dugmesine basan) secebilirim. Kaynak kodum [burada](https://github.com/backmeupplz/randymbot). Ayrica /language ile botun dilini ve /number ile cekilisi kazanacak kisi sayisini da degistirebilirsiniz (varsayilan 1).\n\n1. Beni bir kanala veya gruba ekle, /randy komutunu gonder ve cekilis baslasin!\n2. Cekilisi bitirmek icin cekilis iletime herhangi bir mesajla yanit verin ve katilimcilardan rastgele bir kazanan secilecektir.\n\nBaska sorularin mi var? Destek kanalimiza gelin — @borodutch\\_support 🦄',
    uk:
      'Привіт! Це Ренді Марш. Я вмію випадковим чином вибирати учасника чату або каналу з тих, що натиснули на кнопку "Взяти участь". Мій вихідний код [ось тут](https://github.com/backmeupplz/randymbot). Змінити мову можна командою /language. Змінити кількість переможців (стандартно — 1) командою /number.\n\n1. Надішліть команду /randy і почнеться розіграш.\n2. Дайте відповідь на повідомлення про розіграш будь-яким повідомленням, і розіграш завершиться, а переможець буде обраний з учасників.\n\nЗалишилися питання? Почитайте наш канал підтримки — @borodutch_support 🦄',
  },
  no_work_private: {
    ru: 'Простите, но эта команда не работает в личке с ботом.',
    en: 'Sorry, but this command is not available in private messages.',
    pt: 'Desculpe, mas este comando não está disponível em conversas privadas.',
    tr: 'Uzgunum, bu komut ozel mesajlarda mevcut degil.',
    uk: 'Вибачте, але ця команда не працює в діалозі з ботом.',
  },
  select_language: {
    ru: 'Пожалуйста, выберите язык',
    en: 'Please, select the language',
    pt: 'Por favor, escolha o idioma',
    tr: 'Lutfen dilinizi seciniz',
    uk: 'Будь ласка, оберіть мову',
  },
  language_selected: {
    ru: 'Спасибо, теперь я говорю по-русски!',
    en: 'Thank you! Now I speak English',
    pt: 'Obrigado! Agora eu falarei português',
    tr: 'Tesekkurler! Artik Turkce konusuyorum',
    uk: 'Дякую, тепер я говорю українською!',
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
  },
  please_retry: {
    ru: 'Пожалуйста, попробуйте через пару минут',
    en: 'Please, try in a couple of minutes',
    pt: 'Por favor, tente novamente daqui a alguns instantes',
    tr: 'Lutfen birkac dakika icinde tekrar deneyiniz',
    uk: 'Будь ласка, спробуйте за декілька хвилин',
  },
  already_participating: {
    ru: 'Вы уже принимаете участие, отлично!',
    en: 'You are already participating, wonderful!',
    pt: 'Você já está participando. Muito bem!',
    tr: 'Zaten cekilise katildiniz, geriye kazanmak kaldi!',
    uk: 'Ви вже берете участь, чудово!',
  },
  participated: {
    ru: 'Отлично, вы отметились, как участник!',
    en: 'Great, you are now participating in this raffle!',
    pt: 'Muito bem, vocês agora está participando do sorteio!',
    tr: 'Harika, cekilise katildiniz!',
    uk: 'Відмінно, ви відзначилися, як учасник!',
  },
  participants_number: {
    ru: 'Количество участников',
    en: 'Number of participants',
    pt: 'Número de participantes',
    tr: 'Katilimci sayisi',
    uk: 'Кількість учасників',
  },
  participate_button: {
    ru: 'Участвовать!',
    en: 'Participate!',
    pt: 'Participar!',
    tr: 'Katil!',
    uk: 'Взяти участь!',
  },
  no_participants: {
    ru: 'В этот раз участников розыгрыша не было 😅',
    en: 'No participants this time 😅',
    pt: 'Sem participantes dessa vez 😅',
    tr: 'Katilimci yok 😅',
    uk: 'Цього разу учасників розіграшу не було 😅',
  },
  winner: {
    ru: 'В этот раз победитель',
    en: 'The winner is',
    pt: 'O vencedor é',
    tr: 'Ve Kazanan kisi',
    uk: 'Цього разу переможець',
  },
  winners: {
    ru: 'В этот раз победители',
    en: 'The winners are',
    pt: 'Os ganhadores são',
    tr: 'Ve Kazanan kisilerr',
    uk: 'Цього разу переможці',
  },
  congratulations: {
    ru: 'Поздравляем',
    en: 'Congratulations',
    pt: 'Parabéns',
    tr: 'Tebrikler',
    uk: 'Вітаємо',
  },
  raffle_over: {
    ru: 'Простите, но розыгрыш уже закончен',
    en: 'Sorry, the raffle is over now',
    pt: 'Pedimos desculpas, mas o sorteio terminou',
    tr: 'Uzgunum, cekilis simdi bitti',
    uk: 'Вибачте, але розіграш вже завершено',
  },
  select_number: {
    ru: 'Пожалуйста, выберите, сколько победителей должно быть в розыгрыше',
    en: 'Please, select number of winners for a raffle',
    pt: 'Por favor selecione o número de ganhadores do sorteio',
    tr: 'Lutfen cekilis icin kazanacak kisi sayisini seciniz',
    uk: 'Будь ласка, виберіть, скільки переможців має бути в розіграші',
  },
  number_selected: {
    ru: 'Отлично, вы выбрали количество победителей!',
    en: "Great! You've selected the number of winners!",
    pt: 'Ótimo! Você selecionou o número de ganhadores!',
    tr: 'Harika! Kazanacak kisi sayisini sectin!',
    uk: 'Чудово, ви вибрали кількість переможців!',
  },
  not_enough_participants: {
    ru: 'В этот раз участников розыгрыша было недостаточно 😅',
    en: 'Not enough participants this time 😅',
    pt: 'Sem participantes suficientes 😅',
    tr: 'Cekilis icin yeteri kadar katilimci yok 😅',
    uk: 'Цього разу учасників розіграшу було недостатньо 😅',
  },
}
