import type { ValidationTargets } from 'hono'
import type { ZodType } from 'zod'
import { zValidator } from '@hono/zod-validator'

export function validate<T extends ZodType, Target extends keyof ValidationTargets>(target: Target, schema: T) {
  return zValidator(target, schema, (result) => {
    if (!result.success) {
      throw result.error
    }
  })
}
