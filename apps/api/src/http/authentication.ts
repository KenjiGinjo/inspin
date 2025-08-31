import { EnumUserStatus } from '@inspin/enums'
import { generateCode } from '@inspin/tools/both'
import { hashPassword, verifyPassword } from '@inspin/tools/crypto'
import { Exception } from '@inspin/tools/exception'
import { vAuthChangePassword, vAuthLoginByPassword, vAuthRegisterByEmail, vSendEmailVerificationCode } from '@inspin/validations'
import { Cache, db, ds } from 'db'
import { Hono } from 'hono'
import { jwtResponse, jwtSign, validate } from '@/src/utils'
import { ENV } from '../env'
import { auth, ip } from '../middleware'

export const authentication = new Hono()
  .basePath('/authentication')
  /** 检查账号是否存在 */
  .get('/check-exist', async (c) => {
    return c.body(null, 200)
  })

  /** 发送邮箱验证码 */
  .post('/send-email-verification-code', validate('json', vSendEmailVerificationCode), ip(), async (c) => {
    const { email } = c.req.valid('json')

    const ipAddress = c.get('ipAddress')

    if (ipAddress) {
      const ipHistoryRecord = await Cache.get({ key: `ip_history_record:${ipAddress}` })

      if (ipHistoryRecord) {
        if (Number(ipHistoryRecord) >= 10) {
          throw new Exception.BadRequestException('ip rate limit exceeded')
        }
        else {
          await Cache.set({ key: `ip_history_record:${ipAddress}`, value: `${Number(ipHistoryRecord) + 1}`, ttl: '300s' })
        }
      }
      else {
        await Cache.set({ key: `ip_history_record:${ipAddress}`, value: '1', ttl: '300s' })
      }
    }

    const key = `email_verification_code:${email}`
    const cacheValue = await Cache.get({ key })

    if (cacheValue) {
      throw new Exception.BadRequestException('Email rate limit exceeded')
    }

    const existingUser = await db.user.where({ email }).takeOptional()
    if (existingUser) {
      throw new Exception.BadRequestException('Email already registered')
    }

    const code = generateCode({ length: 6 })

    await Cache.set({ key, value: code, ttl: '60s' })

    // TODO: 发送验证码邮件

    const devMode = ENV.APP_STAGE === 'dev'

    if (devMode) {
      return c.json({ meta: { code } })
    }

    return c.body(null, 204)
  })

  /** 发送手机号验证码 */
  .post('/send-phone-verification-code', async (c) => {
    return c.body(null, 200)
  })

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

  /** 手机号登录 */
  .post('/login-by-phone', async (c) => {
    return c.body(null, 200)
  })

  /** 谷歌登录 */
  .post('/login-by-google', async (c) => {
    return c.body(null, 200)
  })

  /** 邮箱注册 */
  .post('/register-by-email', validate('json', vAuthRegisterByEmail), async (c) => {
    const { email, code, username, password, confirmPassword } = c.req.valid('json')

    const cacheValue = await Cache.get({ key: `email_verification_code:${email}` })

    if (cacheValue !== code) {
      throw new Exception.BadRequestException('Verification code is incorrect')
    }

    if (password !== confirmPassword) {
      throw new Exception.BadRequestException('Password and confirm password do not match')
    }

    const user = await ds.user.create({ email, username, password })

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

  /** 手机号注册 */
  .post('/register-by-phone', async (c) => {
    return c.body(null, 200)
  })

  /** 谷歌注册 */
  .post('/register-by-google', async (c) => {
    return c.body(null, 200)
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
    await db.userAddress.where({ userId: user.id }).delete()
    await db.profile.where({ userId: user.id }).delete()
    await db.user.where({ id: user.id }).delete()

    return c.body(null, 204)
  })
