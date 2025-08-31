import { createRepo } from 'orchid-orm'
import { db } from '../tables'

const selectForDefault = db.user.makeHelper((q) => {
  return q
    .select('id')
    .select({
      profile: q => q.profile.select('nickname', 'avatar'),
    })
})

export const user = createRepo(db.user, {
  queryMethods: {
    selectForDefault: (q) => {
      return selectForDefault(q)
    },
  },
})
