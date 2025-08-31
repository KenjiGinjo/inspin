import type { EnumUserTodoStatus } from '@inspin/enums'

export interface IAdventurBase {
  description: string
  category: string
}

interface IUserAdventurBase extends IAdventurBase {
  id: string
  status: EnumUserTodoStatus
}

export type ResAdventure = IUserAdventurBase | null | 'fullfilled-in-last-7-days'
