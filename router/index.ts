import { Router } from '@grammyjs/router'
import { db } from '../db'
import { MyContext } from '../types'

const router = new Router<MyContext>((ctx) => ctx.session.step)

router.route('newcollection', async (ctx) => {
  ctx.session.new = ctx.message?.text
  ctx.session.step = 'back'
  await ctx.reply('Enter collection name')
})

router.route('front', async (ctx) => {
  ctx.session.front = ctx.message?.text
  ctx.session.step = 'back'
  await ctx.reply('Please specify card back')
})

router.route('back', async (ctx) => {
  ctx.session.back = ctx.message?.text
  ctx.session.step = ''

  db.addCard({
    id: Math.floor(Math.random() * 100),
    front: ctx.session.front,
    back: ctx.session.back,
  })
  await ctx.reply('Card was add. Noice!')
})

export { router }
