import type { ResAdventure } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { EnumUserTodoStatus } from '@inspin/enums'
import { addDays } from 'date-fns'
import { db } from 'db'
import { Hono } from 'hono'
import { authOptional } from '../middleware'

export const adventure = new Hono()
  .basePath('/adventure')
  /** 获取冒险信息 */
  .get('/', authOptional(), async (c): Promise<HonoResponse<{ data: ResAdventure }>> => {
    const user = c.get('user')
    if (!user) {
      return c.json({
        data: null,
      })
    }

    const data = await db.userTodo
      .where({ userId: user.id, status: EnumUserTodoStatus.InProgress, createdAt: {
        gte: addDays(new Date(), -7),
        lte: new Date(),
      } })
      .select('description', 'category', 'status')
      .order({ createdAt: 'DESC' })
      .takeOptional()

    if (data) {
      return c.json({ data })
    }

    return c.json({
      data: 'fullfilled-in-last-7-days',
    })
  })
  .post('/', authOptional(), async (c): Promise<HonoResponse<{ data: ResAdventure }>> => {
    const user = c.get('user')
    if (!user) {
      return c.json({
        data: null,
      })
    }

    const data = await db.userTodo.create({ userId: user.id, status: EnumUserTodoStatus.InProgress })
  })
