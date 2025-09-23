import type { IAdventurBase, ResUserTodoList } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { EnumUserTodoStatus } from '@inspin/enums'
import { Exception } from '@inspin/tools/exception'
import { dr, ds } from 'db'
import { Hono } from 'hono'
import { auth, authOptional } from '../middleware'

export const adventure = new Hono()
  .basePath('/adventure')

  /** 获取冒险信息 */
  .get('/', auth(), async (c): Promise<HonoResponse<{ data: ResUserTodoList | null | 'fullfilled-in-last-7-days' }>> => {
    const user = c.get('user')

    const data = await dr.userTodo
      .where({
        userId: user.id,
        status: EnumUserTodoStatus.Pending,
      })
      .selectForDefault()
      .order({ createdAt: 'DESC' })
      .takeOptional()

    if (data) {
      return c.json({ data })
    }

    const result = await ds.userTodo.getWeeklyFullfilled({ userId: user.id })

    return c.json({ data: result ? 'fullfilled-in-last-7-days' : null })
  })

  /** 领取冒险 */
  .post('/', authOptional(), async (c): Promise<HonoResponse<{ data: IAdventurBase }>> => {
    const user = c.get('user')
    if (!user) {
      const data = await dr.todo.getRandom().take()
      return c.json({ data })
    }

    const weeklyFullfilled = await ds.userTodo.getWeeklyFullfilled({ userId: user.id })

    if (weeklyFullfilled) {
      throw new Exception.BadRequestException('已经完成近一周的冒险')
    }

    const data = await ds.userTodo.create({ userId: user.id })

    return c.json({ data })
  })
