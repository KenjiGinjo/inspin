import { z } from 'zod'

export const vUserProfileUpdate = z.object({
  nickname: z.string({ required_error: 'Nickname is required' }).min(1, 'Nickname is required').max(30, 'Nickname is too long'),
  bio: z.string({ required_error: 'Bio is required' }).min(1, 'Bio is required').max(200, 'Bio is too long'),
}).partial()
export type vUserProfileUpdate = z.infer<typeof vUserProfileUpdate>

export const vUserListAdminQuery = z.object({
  searchKeyword: z.string().optional(),
})
export type vUserListAdminQuery = z.infer<typeof vUserListAdminQuery>
