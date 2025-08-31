import type { IAdventurBase, ResAdventure } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { EnumUserTodoStatus } from '@inspin/enums'
import { BeijingDate } from '@inspin/tools/both'
import { Exception } from '@inspin/tools/exception'
import { vIds } from '@inspin/validations'
import { subDays } from 'date-fns'
import { db, dr } from 'db'
import { Hono } from 'hono'
import { auth, authOptional } from '../middleware'
import { validate } from '../utils'

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

    const { start, end } = BeijingDate.getWeekRange()

    const data = await db.userTodo
      .where({
        userId: user.id,
        status: EnumUserTodoStatus.Pending,
        createdAt: {
          gte: start,
          lte: end,
        },
      })
      .select('id', 'description', 'category', 'status')
      .order({ createdAt: 'DESC' })
      .takeOptional()

    if (data) {
      return c.json({ data })
    }

    return c.json({
      data: 'fullfilled-in-last-7-days',
    })
  })

  /** 领取冒险 */
  .post('/', authOptional(), async (c): Promise<HonoResponse<{ data: IAdventurBase }>> => {
    const user = c.get('user')
    if (!user) {
      const data = await dr.todo.getRandom().take()
      return c.json({ data })
    }

    const { start, end } = BeijingDate.getWeekRange()

    const hasFullfilledInLast7Days = await db.userTodo
      .where({
        userId: user.id,
        createdAt: {
          gte: start,
          lte: end,
        },
      })
      .exists()
    if (hasFullfilledInLast7Days) {
      throw new Exception.BadRequestException('已经完成近一周的冒险')
    }

    const records = await db.userTodo.where({
      userId: user.id,
      createdAt: {
        gte: subDays(new Date(), 30),
        lte: new Date(),
      },
    }).select('todoId')

    const data = await dr.todo.getRandom().whereNotIn('id', records.map(item => item.todoId)).select('id').take()

    await db.userTodo.create({
      userId: user.id,
      todoId: data.id,
      status: EnumUserTodoStatus.Pending,
      description: data.description,
      category: data.category,
    })

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
  })
