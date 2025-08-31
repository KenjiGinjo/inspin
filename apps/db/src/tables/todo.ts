import { EnumTodoStatus } from '@inspin/enums'
import { BaseTable } from './_base'

export class TableTodo extends BaseTable {
  public override readonly table = 'todo'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),
    deletedAt: t.xTimestamp().nullable(),

    description: t.string().nullable(),
    category: t.string().nullable(),
    status: t.xEnum(EnumTodoStatus),

  }))
}
