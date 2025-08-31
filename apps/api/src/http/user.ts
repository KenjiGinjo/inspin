import type { ResUserBase, ResUserProfile } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { join } from 'node:path'
import { vUserProfileUpdate } from '@inspin/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { auth, authOptional } from '../middleware'
import { validate } from '../utils'
import { saveBase64Image } from '../utils/file'

export const user = new Hono()
  .basePath('/user')
  /** 用户状态 */
  .get('/state', authOptional(), async (c): Promise<HonoResponse<{ data: ResUserBase | null }>> => {
    const _user = c.get('user')

    if (!_user) {
      return c.json({
        data: null,
      })
    }

    const userId = _user.id
    const profile = await db.profile.findBy({ userId })

    return c.json({
      data: {
        id: userId,
        profile: {
          nickname: profile.nickname,
          avatar: profile.avatar,
        },
      },
    })
  })

  /** 用户信息 */
  .get('/profile', auth(), async (c): Promise<HonoResponse<{ data: ResUserProfile }>> => {
    const user = c.get('user')

    const data = await db.profile.findBy({ userId: user.id })

    return c.json({ data })
  })

  /** 更新用户信息 */
  .put('/profile', auth(), validate('json', vUserProfileUpdate), async (c) => {
    const dto = c.req.valid('json')

    const user = c.get('user')

    if (dto.avatar && dto.avatar.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
      const uploadsDir = join(__dirname, '../../uploads')
      const savedPath = saveBase64Image({
        base64Data: dto.avatar,
        uploadDir: uploadsDir,
        subDir: 'user-avatar',
      })
      dto.avatar = savedPath
    }

    await db.profile.findBy({ userId: user.id }).update({
      ...dto,
    })

    return c.body(null, 200)
  })
