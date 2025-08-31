import type { ResAdminAuthState } from '@inspin/interfaces'
import type { HonoResponse } from '@/src/types'
import { Exception } from '@inspin/tools/exception'
import { db } from 'db'
import { Hono } from 'hono'
import { authAd } from '@/src/middleware'

export const auth = new Hono()
  .basePath('/auth')
  .get('/state', authAd(), async (c): Promise<HonoResponse<{ data: ResAdminAuthState }>> => {
    const authId = c.get('authId')

    const data = await db.admin.where({ id: authId }).select(
      'id',
      'nickname',
      'avatar',
    ).takeOptional()

    if (!data) {
      throw new Exception.UnauthorizedException('用户不存在')
    }

    return c.json({ data })
  })
