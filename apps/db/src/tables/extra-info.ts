import { EnumExtraInfoTargetType } from '@inspin/enums'
import { BaseTable } from './_base'
import { TableUser } from './user'

export class TableExtraInfo extends BaseTable {
  public override readonly table = 'extra_info'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    targetId: t.string(),
    targetType: t.xEnum(EnumExtraInfoTargetType),

    content: t.text(),
    payload: t.json().hasDefault(),

    userId: t.string(),
  }))

  public relations = {
    user: this.belongsTo(() => TableUser, {
      columns: ['userId'],
      references: ['id'],
    }),
  }
}
