import { z } from 'zod'
import { vId } from './_utils'

export const vRaffleEntryRecordUpdate = z.object({
  userAddressId: vId.optional(),
  remark: z.string().optional(),
})
export type vRaffleEntryRecordUpdate = z.infer<typeof vRaffleEntryRecordUpdate>
