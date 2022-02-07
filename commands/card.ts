import { Bot, InlineKeyboard } from 'grammy'
import { db } from '../db'
import { MyContext } from '../types'

function useCardCommands(bot: Bot<MyContext>) {
  bot.callbackQuery(/^card:[\d]+$/, async (ctx) => {
    const [, id] = ctx.callbackQuery.data.split(':')

    ctx.session.selectedCardId = id

    const card = db.cards.find((i: any) => i.id === Number(id))

    await ctx.answerCallbackQuery({
      show_alert: false,
    })

    const inlineKeyboard = new InlineKeyboard()
    inlineKeyboard
      .text('edit front', `card:${card.id}:front`)
      .text('edit back', `card:${card.id}:back`)
      .text('delete', `card:${card.id}:delete`)

    ctx.editMessageText(`${card.front}\n${card.back}`, {
      reply_markup: inlineKeyboard,
    })
  })

  bot.callbackQuery(/^card:[\d]+:delete$/, async (ctx) => {
    const [, id] = ctx.callbackQuery.data.split(':')

    await ctx.answerCallbackQuery({
      show_alert: false,
    })

    console.log('delete')
  })

  bot.callbackQuery(/^card:[\d]+:front$/, async (ctx) => {
    const [, id] = ctx.callbackQuery.data.split(':')

    await ctx.answerCallbackQuery({
      show_alert: false,
    })

    console.log('front')
  })

  bot.callbackQuery(/^card:[\d]+:back$/, async (ctx) => {
    const [, id] = ctx.callbackQuery.data.split(':')

    await ctx.answerCallbackQuery({
      show_alert: false,
    })

    console.log('back')
  })
}

export { useCardCommands }
