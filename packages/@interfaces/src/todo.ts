import type { EnumTodoStatus } from '@inspin/enums'

export interface ResTodoList {
  id: string
  description: string
  category: string
  status: EnumTodoStatus
  createdAt: string
  updatedAt: string
}
