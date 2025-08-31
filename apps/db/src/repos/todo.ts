import { createRepo } from 'orchid-orm'
import { db } from '../tables'

const selectForDefault = db.todo.makeHelper((q) => {
  return q
    .select('description', 'category')
})

export const todo = createRepo(db.todo, {
  queryMethods: {
    getRandom: (q) => {
      return selectForDefault(q).orderSql`random()`
    },
  },
})
