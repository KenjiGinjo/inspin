import { z } from 'zod'
import { vId } from './_utils'

export const vCharacterSaleOrderUpdate = z.object({
  userAddressId: vId.optional(),
})
export type vCharacterSaleOrderUpdate = z.infer<typeof vCharacterSaleOrderUpdate>
