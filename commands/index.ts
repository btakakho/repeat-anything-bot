import { Bot, InlineKeyboard } from 'grammy'
import { MyContext } from '../types'
import { db } from '../db'
import { useCardCommands } from './card'

const useCommands = (bot: Bot<MyContext>) => {
  bot.command('start', (ctx) => {})
  bot.command('settings', (ctx) => {})
  bot.command('help', (ctx) => {})
  bot.command('random', (ctx) => {})

  bot.command('newcollection', async (ctx) => {
    ctx.session.step = 'newcollection'
    await ctx.reply('Collection name:')
  })

  bot.command('addcard', async (ctx) => {
    ctx.session.step = 'front'
    await ctx.reply('Pleasy specify card front:')
  })

  bot.command('listcards', async (ctx) => {
    const inlineKeyboard = new InlineKeyboard()

    db.cards.forEach((card: any) => {
      inlineKeyboard.text(card.front, `card:` + card.id)
      inlineKeyboard.row()
    })

    return await ctx.reply('Choose card:', { reply_markup: inlineKeyboard })
  })

  bot.command('listcollections', async (ctx) => {
    const inlineKeyboard = new InlineKeyboard()

    db.collections.forEach((collection: any) => {
      inlineKeyboard.text(collection.front, `collection:` + collection.id)
      inlineKeyboard.row()
    })

    return await ctx.reply('Choose collection:', {
      reply_markup: inlineKeyboard,
    })
  })

  useCardCommands(bot)
}

export { useCommands }
