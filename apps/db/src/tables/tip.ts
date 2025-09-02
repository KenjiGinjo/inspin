import { BaseTable } from './_base'

export class TableTip extends BaseTable {
  public override readonly table = 'tip'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),
    deletedAt: t.xTimestamp().nullable(),

    content: t.string(),

  }))
}
