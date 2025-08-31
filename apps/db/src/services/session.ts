import { db } from '..'

export const session = {
  generateForUserLogin: async (userId: string, payload?: Record<string, any>) => {
    const session = await db.session.where({ userId }).exists()

    if (session) {
      await db.session.where({ userId }).delete()
    }

    return await db.session.create({
      userId,
      // 14 days
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
      payload,
    })
  },
}
