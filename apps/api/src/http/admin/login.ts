import { verifyPassword } from '@inspin/tools/crypto'
import { Exception } from '@inspin/tools/exception'
import { vAuthLoginByPassword } from '@inspin/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { ENV } from '@/src/env'
import { validate } from '@/src/utils'
import { jwtResponse, jwtSign } from '@/src/utils/jwt'

export const login = new Hono()
  .basePath('/login')

  /** 密码登录 */
  .post('/password', validate('json', vAuthLoginByPassword), async (c) => {
    const { username, password } = c.req.valid('json')

    const admin = await db.admin.where({ username }).takeOptional()

    if (!admin) {
      throw new Exception.BadRequestException('账号或密码错误')
    }

    if (!await verifyPassword(password, admin.password)) {
      throw new Exception.BadRequestException('账号或密码错误.')
    }

    const token = await jwtSign({
      secret: ENV.JWT_SECRET_ADMIN,
      sub: admin.id,
      exp: 3600 * 24 * 14,
    })

    return c.json({ meta: jwtResponse({ token }) })
  })
