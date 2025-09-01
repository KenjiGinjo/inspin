import type { IAdventurBase, ResUserTodoList } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { EnumUserTodoStatus } from '@inspin/enums'
import { Exception } from '@inspin/tools/exception'
import { vIds } from '@inspin/validations'
import { db, dr, ds } from 'db'
import { Hono } from 'hono'
import { auth, authOptional } from '../middleware'
import { validate } from '../utils'

export const adventure = new Hono()
  .basePath('/adventure')

  /** 获取冒险信息 */
  .get('/', authOptional(), async (c): Promise<HonoResponse<{ data: ResUserTodoList | null | 'fullfilled-in-last-7-days' }>> => {
    const user = c.get('user')
    if (!user) {
      return c.json({
        data: null,
      })
    }

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

  /** 完成冒险 */
  .post('/:userTodoId/finish', auth(), validate('param', vIds('userTodoId')), async (c) => {
    const user = c.get('user')
    const { userTodoId } = c.req.valid('param')

    await db.userTodo.where({ id: userTodoId, userId: user.id }).update({
      finishedAt: new Date(),
      status: EnumUserTodoStatus.Finished,
    })

    return c.body(null, 204)
  })

  /** 失败冒险 */
  .post('/:userTodoId/fail', auth(), validate('param', vIds('userTodoId')), async (c) => {
    const user = c.get('user')
    const { userTodoId } = c.req.valid('param')

    await db.userTodo.where({ id: userTodoId, userId: user.id }).update({
      failedAt: new Date(),
      status: EnumUserTodoStatus.Failed,
    })

    return c.body(null, 204)
  })
