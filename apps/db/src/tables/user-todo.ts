import { BaseTable } from './_base'

export class TableUserTodo extends BaseTable {
  public override readonly table = 'user_todo'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),
    deletedAt: t.xTimestamp().nullable(),

    finishedAt: t.xTimestamp().nullable(),

    description: t.string().nullable(),

    userId: t.string(),
    todoId: t.string(),
  }))
}
