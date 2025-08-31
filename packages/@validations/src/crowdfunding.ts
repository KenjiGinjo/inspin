import { EnumCharacterCrowdfundingStatus } from '@inspin/enums'
import { z } from 'zod'

export const vCrowdfundingListQuery = z.object({
  orderBy: z.enum(['latest', 'mostView']),
  genre: z.string().optional(),
  name: z.string().optional(),
  status: z.nativeEnum(EnumCharacterCrowdfundingStatus).optional(),
})
export type vCrowdfundingListQuery = z.infer<typeof vCrowdfundingListQuery>

export const vCrowdfundingUpdate = z.object({
  countTarget: z.coerce.number({
    required_error: 'Count target is required',
    invalid_type_error: 'Count target must be a number',
  }).min(100, 'Count target should be at least 100').max(1000000, 'Count target should be less than 1000000'),
  countCurrent: z.coerce.number({
    required_error: 'Count current is required',
    invalid_type_error: 'Count current must be a number',
  }).max(1000000, 'Count current should be less than 1000000'),
  images: z.array(z.string()).min(1, 'Images should be at least 1').max(8, 'Images should be less than 8'),
  endAt: z.coerce.date().min(new Date(), 'End at should be greater than current date'),
})
export type vCrowdfundingUpdate = z.infer<typeof vCrowdfundingUpdate>

export const vCrowdfundingSpecCreate = z.object({
  price: z.coerce.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }).min(1, 'Price should be at least 1').max(1000000, 'Price should be less than 1000000'),
  diamond: z.coerce.number({
    required_error: 'Diamond is required',
    invalid_type_error: 'Diamond must be a number',
  }).min(1, 'Diamond should be at least 1').max(1000000, 'Diamond should be less than 1000000'),
})
export type vCrowdfundingSpecCreate = z.infer<typeof vCrowdfundingSpecCreate>

export const vCrowdfundingSpecUpdate = vCrowdfundingSpecCreate
export type vCrowdfundingSpecUpdate = z.infer<typeof vCrowdfundingSpecUpdate>
