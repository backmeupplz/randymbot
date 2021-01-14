[![@randymbot](/img/logo.png?raw=true)](https://t.me/randymbot)

# [@randymbot](https://t.me/randymbot) Telegram bot code
This is the code for the raffle Telegram bot I've built. Enjoy and feel free to reuse!

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
