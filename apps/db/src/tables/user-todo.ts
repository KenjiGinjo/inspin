import { EnumUserTodoStatus } from '@inspin/enums'
import { BaseTable } from './_base'

export class TableUserTodo extends BaseTable {
  public override readonly table = 'user_todo'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),
    deletedAt: t.xTimestamp().nullable(),

    finishedAt: t.xTimestamp().nullable(),
    failedAt: t.xTimestamp().nullable(),

    description: t.string().nullable(),

    status: t.xEnum(EnumUserTodoStatus),

    userId: t.string(),
    todoId: t.string(),
  }))
}
