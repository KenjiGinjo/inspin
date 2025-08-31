import { EnumGender } from '@inspin/enums'
import { z } from 'zod'
import { vId } from './_utils'

export const vCharacterCreate = z.object({
  name: z.string({
    required_error: 'Character name is required',
    invalid_type_error: 'Character name must be a string',
  }).max(255, 'Character name must be less than 255 characters'),
  gender: z.nativeEnum(EnumGender, {
    required_error: 'Character gender is required',
    invalid_type_error: 'Character gender must be a string',
  }),
  description: z.string({
    required_error: 'Character description is required',
    invalid_type_error: 'Character description must be a string',
  }).min(20, 'Character description should be at least 200 characters').max(2000, 'Character description must be less than 2000 characters'),
  website: z.string({
    required_error: 'Character website is required',
    invalid_type_error: 'Character website must be a string',
  }).optional(),
  illustration: z.string({
    required_error: 'Character illustration is required',
    invalid_type_error: 'Character illustration must be a string',
  }).optional(),
  genre: z.string({
    required_error: 'Character genre is required',
    invalid_type_error: 'Character genre must be a string',
  }).min(1, 'Character genre is required').max(400, 'Character genre must be less than 100 characters'),
  note: z.string({
    required_error: 'Character note is required',
    invalid_type_error: 'Character note must be a string',
  }).min(1, 'Character note is required').max(2000, 'Character note must be less than 2000 characters'),

  creatorName: z.string({
    required_error: 'Creator name is required',
    invalid_type_error: 'Creator name must be a string',
  }).min(1, 'Creator name is required').max(255, 'Creator name must be less than 100 characters'),
  creatorWebsite: z.string({
    required_error: 'Creator website is required',
    invalid_type_error: 'Creator website must be a string',
  }).url('Creator website must be a valid URL'),
})
export type vCharacterCreate = z.infer<typeof vCharacterCreate>

export const vCharacterUpdate = vCharacterCreate.partial()
export type vCharacterUpdate = z.infer<typeof vCharacterUpdate>

export const vCharacterReject = z.object({
  rejectReason: z.string({
    required_error: 'Reject reason is required',
    invalid_type_error: 'Reject reason must be a string',
  }).max(2000, 'reject reason must be less than 2000 characters'),
})
export type vCharacterReject = z.infer<typeof vCharacterReject>

export const vCharacterCrowdfundingSupport = z.object({
  characterId: vId,
  specId: vId,
})
export type vCharacterCrowdfundingSupport = z.infer<typeof vCharacterCrowdfundingSupport>

export const vCharacterMyCampaigns = z.object({
  name: z.string().optional(),
})
export type vCharacterMyCampaigns = z.infer<typeof vCharacterMyCampaigns>
