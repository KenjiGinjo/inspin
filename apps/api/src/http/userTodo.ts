import type { ResUserTodoList } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { EnumUserTodoStatus } from '@inspin/enums'
import { vIds } from '@inspin/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { auth } from '../middleware'
import { pagination, validate } from '../utils'

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

  /** 完成冒险 */
  .post('/:id/finish', auth(), validate('param', vIds('id')), async (c) => {
    const user = c.get('user')
    const { id } = c.req.valid('param')

    await db.userTodo.where({ id, userId: user.id }).update({
      finishedAt: new Date(),
      status: EnumUserTodoStatus.Finished,
    })

    return c.body(null, 204)
  })

  /** 失败冒险 */
  .post('/:id/fail', auth(), validate('param', vIds('id')), async (c) => {
    const user = c.get('user')
    const { id } = c.req.valid('param')

    await db.userTodo.where({ id, userId: user.id }).update({
      failedAt: new Date(),
      status: EnumUserTodoStatus.Failed,
    })

    return c.body(null, 204)
  })

  /** 标记为未完成 */
  .post('/:userTodoId/pending', auth(), validate('param', vIds('userTodoId')), async (c) => {
    const user = c.get('user')
    const { userTodoId } = c.req.valid('param')

    await db.userTodo.where({ id: userTodoId, userId: user.id }).update({
      finishedAt: null,
      failedAt: null,
      status: EnumUserTodoStatus.Pending,
    })

    return c.body(null, 204)
  })
