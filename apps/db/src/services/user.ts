import { hashPassword } from '@inspin/tools/crypto'
import { Exception } from '@inspin/tools/exception'
import { db } from '../tables'

export const user = {
  create: async ({ email, username, password }: { email: string, username: string, password: string }) => {
    const existingEmail = await db.user.where({ email }).takeOptional()

    if (existingEmail) {
      throw new Exception.BadRequestException('Email already registered')
    }

    const existingUsername = await db.user.where({ username }).takeOptional()

    if (existingUsername) {
      throw new Exception.BadRequestException('Username already registered')
    }

    const hashedPassword = await hashPassword(password)

    const user = await db.user.create({
      email,
      username,
      password: hashedPassword,
      profile: {
        create: {
          nickname: 'unset-nickname',
          bio: 'unset-bio',
        },
      },
    })

    return user
  },
}
