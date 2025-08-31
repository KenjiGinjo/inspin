import { EnumUserStatus } from '@inspin/enums'
import { BaseTable } from './_base'
import { TableExtraInfo } from './extra-info'
import { TableProfile } from './profile'
import { TableSession } from './session'

export class TableUser extends BaseTable {
  public override readonly table = 'user'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    username: t.string().nullable(),
    password: t.string().nullable(),

    email: t.string().nullable(),
    emailVerifiedAt: t.xTimestamp().nullable(),
    phone: t.string().nullable(),
    phoneVerifiedAt: t.xTimestamp().nullable(),

    status: t.xEnum(EnumUserStatus).hasDefault(),

    diamond: t.integer().hasDefault(),
    voteToken: t.integer().hasDefault(),
  }))

  public relations = {
    profile: this.hasOne(() => TableProfile, {
      columns: ['id'],
      references: ['userId'],
      required: true,
    }),

    sessions: this.hasMany(() => TableSession, {
      columns: ['id'],
      references: ['userId'],
    }),

    extraInfos: this.hasMany(() => TableExtraInfo, {
      columns: ['id'],
      references: ['userId'],
    }),
  }
}
