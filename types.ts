import { Context, SessionFlavor } from 'grammy'

// type GroupProcess = 'group-add' | 'group-delete'
type CardProcess = 'front' | 'back'

export interface SessionData {
  step: CardProcess | string
  front?: string
  back?: string
  [key: string]: any
}

export type MyContext = Context & SessionFlavor<SessionData>
