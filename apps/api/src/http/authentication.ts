import { EnumUserStatus } from '@inspin/enums'
import { hashPassword, verifyPassword } from '@inspin/tools/crypto'
import { Exception } from '@inspin/tools/exception'
import { vAuthChangePassword, vAuthLoginByPassword, vAuthRegister } from '@inspin/validations'
import { db, ds } from 'db'
import { Hono } from 'hono'
import { jwtResponse, jwtSign, validate } from '@/src/utils'
import { ENV } from '../env'
import { auth } from '../middleware'

export const authentication = new Hono()
  .basePath('/authentication')

  /** 密码登录 */
  .post('/login-by-password', validate('json', vAuthLoginByPassword), async (c) => {
    const { username, password } = c.req.valid('json')

    const user = await db.user.orWhere({ username }, { email: username }).takeOptional()

    if (!user) {
      throw new Exception.BadRequestException('The account does not exist')
    }

    if (!user.password) {
      throw new Exception.BadRequestException('The account has not been set a password')
    }

    if (!await verifyPassword(password, user.password)) {
      throw new Exception.BadRequestException('The password is incorrect')
    }

    if (user.status === EnumUserStatus.Blocked) {
      throw new Exception.BadRequestException('The account has been blocked')
    }

    const session = await ds.session.generateForUserLogin(user.id)

    const token = await jwtSign({
      secret: ENV.JWT_SECRET,
      sub: session.id,
      exp: 3600 * 24 * 14,
    })

    return c.json({
      meta: jwtResponse({ token }),
    })
  })

  /** 邮箱注册 */
  .post('/register-by-username', validate('json', vAuthRegister), async (c) => {
    const { username, password, confirmPassword } = c.req.valid('json')

    if (password !== confirmPassword) {
      throw new Exception.BadRequestException('Password and confirm password do not match')
    }

    const user = await ds.user.create({ username, password })

    const session = await ds.session.generateForUserLogin(user.id)

    const token = await jwtSign({
      secret: ENV.JWT_SECRET,
      sub: session.id,
      exp: 3600 * 24 * 14,
    })

    return c.json({
      meta: jwtResponse({ token }),
    })
  })

  /** 退出登录 */
  .put('/logout', auth(), async (c) => {
    const user = c.get('user')

    await db.session.where({ userId: user.id }).delete()

    return c.body(null, 204)
  })

  /** 修改密码 */
  .put('change-password', auth(), validate('json', vAuthChangePassword), async (c) => {
    const user = c.get('user')

    const { oldPassword, newPassword, confirmPassword } = c.req.valid('json')

    if (newPassword !== confirmPassword) {
      throw new Exception.BadRequestException('Password and confirm password do not match')
    }

    if (!user.password) {
      throw new Exception.BadRequestException('The account has not been set a password')
    }

    if (!await verifyPassword(oldPassword, user.password!)) {
      throw new Exception.BadRequestException('Old password is incorrect')
    }

    const hashedPassword = await hashPassword(newPassword)

    await db.user.where({ id: user.id }).update({ password: hashedPassword })

    return c.body(null, 204)
  })

  /** 删除账户 */
  .delete('/delete-account', auth(), async (c) => {
    const user = c.get('user')

    // 删除用户相关的所有数据
    await db.session.where({ userId: user.id }).delete()
    await db.profile.where({ userId: user.id }).delete()
    await db.user.where({ id: user.id }).delete()

    return c.body(null, 204)
  })
