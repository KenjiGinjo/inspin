import { EnumCharacterCrowdfundingSupportStatus, EnumCharacterSaleOrderStatus, EnumCharacterStatus } from '@inspin/enums'
import { z } from 'zod'

export const vAdminCharacterList = z.object({
  status: z.nativeEnum(EnumCharacterStatus).optional(),
  name: z.string().optional(),
  phase: z.enum([
    'vote-active',
    'vote-negotiation',
    'vote-failed',
    'crowdfunding-active',
    'crowdfunding-success',
    'crowdfunding-failed',
    'pre-sale',
    'sale',
  ]).optional(),
})
export type vAdminCharacterList = z.infer<typeof vAdminCharacterList>

export const vCharacterSaleOrderQuery = z.object({
  searchKeyword: z.string().optional(),
  status: z.nativeEnum(EnumCharacterSaleOrderStatus).optional(),
})
export type vCharacterSaleOrderQuery = z.infer<typeof vCharacterSaleOrderQuery>

export const vCrowdfundingSupportQuery = z.object({
  searchKeyword: z.string().optional(),
  status: z.nativeEnum(EnumCharacterCrowdfundingSupportStatus).optional(),
})
export type vCrowdfundingSupportQuery = z.infer<typeof vCrowdfundingSupportQuery>
