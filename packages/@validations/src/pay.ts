import { EnumPayIntentType } from '@inspin/enums'
import { z } from 'zod'
import { vId } from './_utils'

export const vPayConfirm = z.object({
  id: vId,
  type: z.nativeEnum(EnumPayIntentType),
})
export type vPayConfirm = z.infer<typeof vPayConfirm>
