import type { ModelUser } from 'db'
import type { MiddlewareHandler } from 'hono'
import { EnumUserStatus } from '@inspin/enums'
import { db } from 'db'
import { HTTPException } from 'hono/http-exception'
import { ENV } from '../env'
import { jwtExtractSub } from '../utils'

export interface Auth {
  Variables: {
    user: ModelUser
  }
}

export function auth(): MiddlewareHandler<Auth> {
  return async function (ctx, next) {
    const sessionId = await jwtExtractSub({ secret: ENV.JWT_SECRET, ctx })

    if (!sessionId) {
      throw new HTTPException(401, { message: 'Unauthorized' })
    }

    const session = await db.session.findOptional(sessionId)

    if (!session) {
      throw new HTTPException(401, { message: 'Unauthorized' })
    }

    const user = await db.user.findOptional(session.userId)

    if (!user) {
      throw new HTTPException(401, { message: 'Unauthorized' })
    }

    if (user.status === EnumUserStatus.Blocked) {
      throw new HTTPException(401, { message: 'Unauthorized' })
    }

    ctx.set('user', user)

    await next()
  }
}
