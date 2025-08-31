import { z } from 'zod'

export const vVoteListQuery = z.object({
  orderBy: z.enum(['latest', 'mostView']),
  genre: z.string().optional(),
  name: z.string().optional(),
})
export type vVoteListQuery = z.infer<typeof vVoteListQuery>

export const vVoteUpdate = z.object({
  countTarget: z.coerce.number({
    required_error: 'Count target is required',
    invalid_type_error: 'Count target must be a number',
  }).min(100, 'Count target should be at least 100').max(1000000, 'Count target should be less than 1000000'),
  countCurrent: z.coerce.number({
    required_error: 'Count current is required',
    invalid_type_error: 'Count current must be a number',
  }).max(1000000, 'Count current should be less than 1000000'),
})
export type vVoteUpdate = z.infer<typeof vVoteUpdate>
