import { BaseTable } from './_base'
import { TableUser } from './user'

export class TableSession extends BaseTable {
  public override readonly table = 'session'

  public override columns = this.setColumns(t => ({
    id: t.cuid().primaryKey(),
    userId: t.cuid(),
    expireAt: t.xTimestamp(),
    createdAt: t.createdAt(),
    payload: t.json().hasDefault(),
  }))

  public relations = {
    user: this.belongsTo(() => TableUser, {
      columns: ['userId'],
      references: ['id'],
    }),
  }
}
