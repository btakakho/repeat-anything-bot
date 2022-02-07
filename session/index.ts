import { FileAdapter } from '@satont/grammy-file-storage'
import { Bot, session } from 'grammy'
import { MyContext, SessionData } from '../types'

function initial(): SessionData {
  return { step: '' }
}

const useSession = (bot: Bot<MyContext>) => {
  bot.use(
    session({
      initial,
      storage: new FileAdapter({
        dirName: 'sessions',
      }),
    })
  )
}

export { useSession }
