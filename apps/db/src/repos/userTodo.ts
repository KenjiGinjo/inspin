import { createRepo } from 'orchid-orm'
import { db } from '../tables'

const selectForDefault = db.userTodo.makeHelper((q) => {
  return q
    .select('id', 'description', 'category', 'status', 'finishedAt', 'failedAt', 'createdAt', 'updatedAt')
})

export const userTodo = createRepo(db.userTodo, {
  queryMethods: {
    selectForDefault: (q) => {
      return selectForDefault(q)
    },
  },
})
