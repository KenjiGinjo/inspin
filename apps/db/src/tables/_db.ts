import { orchidORM } from 'orchid-orm'
import { ENV } from '../env'
import { TableAdmin } from './admin'
import { TableErrorLog } from './error-log'
import { TableExtraInfo } from './extra-info'
import { TableProfile } from './profile'
import { TableSession } from './session'
import { TableTodo } from './todo'
import { TableUser } from './user'
import { TableUserTodo } from './user-todo'

export const db = orchidORM(
  {
    log: ENV.DATABASE_LOG,
    databaseURL: ENV.DATABASE_URL,
  },
  {
    admin: TableAdmin,
    errorLog: TableErrorLog,
    extraInfo: TableExtraInfo,
    profile: TableProfile,
    session: TableSession,
    user: TableUser,
    userTodo: TableUserTodo,
    todo: TableTodo,
  },
)
