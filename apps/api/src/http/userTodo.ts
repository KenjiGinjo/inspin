import type { ResUserTodoList } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { EnumUserTodoStatus } from '@inspin/enums'
import { db } from 'db'
import { Hono } from 'hono'
import { auth } from '../middleware'
import { pagination } from '../utils'

export const userTodo = new Hono()
  .basePath('/userTodo')

  /** 获取失败冒险信息 */
  .get('/pageForFailed', auth(), pagination(), async (c): Promise<HonoResponse<{ data: ResUserTodoList[] }>> => {
    const user = c.get('user')
    const page = c.get('page')

    const data = await db.userTodo
      .where({
        userId: user.id,
        status: EnumUserTodoStatus.Failed,
      })
      .select('description', 'category', 'status', 'finishedAt', 'failedAt', 'createdAt', 'updatedAt', 'id')
      .order({ createdAt: 'DESC' })
      .offset(page.where.offset)
      .limit(page.where.limit)

    return c.json({ data })
  })

  /** 获取已完成冒险信息 */
  .get('/pageForFinished', auth(), pagination(), async (c): Promise<HonoResponse<{ data: ResUserTodoList[] }>> => {
    const user = c.get('user')
    const page = c.get('page')

    const data = await db.userTodo
      .where({
        userId: user.id,
        status: EnumUserTodoStatus.Finished,
      })
      .offset(page.where.offset)
      .limit(page.where.limit)
      .order({ createdAt: 'DESC' })

    return c.json({ data })
  })
