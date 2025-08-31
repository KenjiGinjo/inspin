import type { EnumUserTodoStatus } from '@inspin/enums'

export interface ResUserTodoList {
  id: string
  description: string
  category: string
  status: EnumUserTodoStatus
  finishedAt: string | null
  failedAt: string | null
  createdAt: string
  updatedAt: string
}
