[![@randymbot](/img/logo.png?raw=true)](https://t.me/randymbot)

# [@randymbot](https://t.me/randymbot): raffles and giveaways in Telegram

**[@randymbot](https://t.me/randymbot)** runs raffles and giveaways in Telegram groups and channels. Add it to your group or channel as an administrator and send `/randy`: it posts a raffle with a Participate button, people join with one tap, and when an admin replies to the raffle message the bot picks a random winner. Open source (MIT).

Website: **[randy.borodutch.com](https://randy.borodutch.com)** (raffles and giveaways in Telegram groups and channels: how it works, settings, FAQ).

## How do I run a giveaway in a Telegram channel?

1. Add [@randymbot](https://t.me/randymbot) to the channel or group as an administrator.
2. Send `/randy`. Randy posts the raffle with a Participate button and counts everyone who presses it.
3. When you're ready to draw, an admin replies to the raffle message with any text, and Randy announces the winners.

`/number 3` picks three winners instead of one, `/subscribe @yourchannel` lets only that channel's subscribers take part, and `/raffleMessage` and `/winnerMessage` set your own texts. To keep the setup out of a busy chat, forward Randy a message from the chat in private and configure it there with `/configRaffle`.

## How it compares

Telegram has its own giveaways (as of November 2026): a channel can give away Telegram Premium subscriptions or Stars, which the channel pays for, and Telegram picks the winners among its subscribers. Randy works for any prize you hand out yourself, in groups as well as channels, and costs nothing. People join by pressing a button, and Randy picks the winners at random from everyone who did.

Randy uses an ordinary pseudo-random generator, which is fine for a giveaway but isn't a draw anyone can audit afterwards, and it doesn't deliver the prize: you contact the winners yourself.

The code follows. Feel free to reuse it.

# Installation and local launch
1. Clone this repo: `git clone https://github.com/backmeupplz/randymbot`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn install` in the root folder
5. Run `yarn distribute`

And you should be good to go! Feel free to fork and submit pull requests. Thanks!

# Environment variables
* `TOKEN` — Telegram bot token
* `USERNAME` — Telegram bot username
* `MONGO`— URL of the mongo database

Also, please, consider looking at `.env.sample`.

# Continuous integration
Any commit pushed to master gets deployed to @randymbot via [CI Ninja](https://github.com/backmeupplz/ci-ninja).

# License
MIT — use for any purpose. Would be great if you could leave a note about the original developers. Thanks!
