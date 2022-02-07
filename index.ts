import { Bot } from 'grammy'
import { config } from 'dotenv'
import { MyContext } from './types'
import { useCommands } from './commands'
import { useSession } from './session'
import { router } from './router'

config()

const { BOT_TOKEN } = process.env

if (typeof BOT_TOKEN === 'undefined') {
  throw new Error('BOT_TOKEN not specified!')
}

const bot = new Bot<MyContext>(BOT_TOKEN, {})

useSession(bot)
useCommands(bot)

bot.use(router)
bot.start()

process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
