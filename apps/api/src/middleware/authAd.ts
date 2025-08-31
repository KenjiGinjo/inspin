import type { MiddlewareHandler } from 'hono'
import { EnumAdminStatus } from '@inspin/enums'
import { db } from 'db'
import { HTTPException } from 'hono/http-exception'
import { ENV } from '../env'
import { jwtExtractSub } from '../utils'

export interface AuthAd {
  Variables: {
    authId: string
  }
}

export function authAd(): MiddlewareHandler<AuthAd> {
  return async function (ctx, next) {
    const authId = await jwtExtractSub({ secret: ENV.JWT_SECRET_ADMIN, ctx })
    if (!authId) {
      throw new HTTPException(404)
    }

    const user = await db.admin.findOptional(authId)
    if (!user || user.status === EnumAdminStatus.Blocked) {
      throw new HTTPException(404)
    }

    ctx.set('authId', authId)

    await next()
  }
}
