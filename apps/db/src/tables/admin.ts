import { EnumAdminStatus } from '@inspin/enums'
import { BaseTable } from './_base'

export class TableAdmin extends BaseTable {
  public override readonly table = 'admin'

  public override columns = this.setColumns(t => ({
    ...t.baseColumns(),

    username: t.string().unique(),
    password: t.string(),

    role: t.json().default([]),
    status: t.xEnum(EnumAdminStatus).default(EnumAdminStatus.Active),

    nickname: t.string().nullable(),
    avatar: t.string().nullable(),
    phone: t.string().nullable(),
    email: t.string().nullable(),

  }))
}
