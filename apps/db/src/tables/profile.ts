import { BaseTable } from './_base'
import { TableUser } from './user'

export class TableProfile extends BaseTable {
  public override readonly table = 'profile'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),
    nickname: t.string().nullable(),
    avatar: t.string().nullable(),
    bio: t.string().hasDefault(),
    userId: t.cuid().unique(),
  }))

  public relations = {
    user: this.belongsTo(() => TableUser, {
      columns: ['userId'],
      references: ['id'],
    }),
  }
}
