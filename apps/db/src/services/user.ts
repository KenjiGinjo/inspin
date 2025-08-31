import { hashPassword } from '@inspin/tools/crypto'
import { Exception } from '@inspin/tools/exception'
import { db } from '../tables'

export const user = {
  create: async ({ username, password }: { username: string, password: string }) => {
    const existingUsername = await db.user.where({ username }).takeOptional()

    if (existingUsername) {
      throw new Exception.BadRequestException('Username already registered')
    }

    const hashedPassword = await hashPassword(password)

    const user = await db.user.create({
      username,
      password: hashedPassword,
      profile: {
        create: {
          nickname: '未设置',
          bio: '未设置',
        },
      },
    })

    return user
  },
}
