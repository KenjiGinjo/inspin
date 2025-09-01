import { EnumUserTodoStatus } from '@inspin/enums'
import { BeijingDate } from '@inspin/tools/both'
import { subDays } from 'date-fns'
import { dr } from '..'
import { db } from '../tables'

export const userTodo = {
  getWeeklyFullfilled: async ({ userId }: { userId: string }): Promise<boolean > => {
    const { start, end } = BeijingDate.getWeekRange()
    const counts = await db.userTodo
      .where({
        userId,
        createdAt: {
          gte: start,
          lte: end,
        },
      })
      .count()

    if (counts < 3) {
      return false
    }

    return true
  },

  create: async ({ userId }: { userId: string }) => {
    let query = dr.todo.getRandom().select('id').take()
    const records = await db.userTodo.where({
      userId,
      createdAt: {
        gte: subDays(new Date(), 30),
        lte: new Date(),
      },
    }).select('todoId')
    const ids = records.map(item => item.todoId)
    if (ids.length > 0) {
      query = query.where({ id: { notIn: ids } })
    }

    const data = await query

    return await db.userTodo.create({
      userId,
      todoId: data.id,
      status: EnumUserTodoStatus.Pending,
      description: data.description,
      category: data.category,
    })
  },
}
