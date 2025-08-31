import type { ModelUser } from 'db'
import type { MiddlewareHandler } from 'hono'
import { EnumUserStatus } from '@inspin/enums'
import { db } from 'db'
import { ENV } from '../env'
import { jwtExtractSub } from '../utils'

export interface AuthOptional {
  Variables: {
    user?: ModelUser
  }
}

export function authOptional(): MiddlewareHandler<AuthOptional> {
  return async function (ctx, next) {
    const sessionId = await jwtExtractSub({ secret: ENV.JWT_SECRET, ctx })

    if (sessionId) {
      const session = await db.session.findOptional(sessionId)

      if (session) {
        const user = await db.user.findOptional(session.userId)

        if (user && user.status === EnumUserStatus.Active) {
          ctx.set('user', user)
        }
      }
    }
    await next()
  }
}
