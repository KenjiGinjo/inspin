import { z } from 'zod'

export const vUserProfileUpdate = z.object({
  nickname: z.string({ error: 'Nickname is required' }).min(1, { error: 'Nickname is required' }).max(30, { error: 'Nickname is too long' }),
  bio: z.string({ error: 'Bio is required' }).min(1, { error: 'Bio is required' }).max(200, { error: 'Bio is too long' }),
}).partial()
export type vUserProfileUpdate = z.infer<typeof vUserProfileUpdate>

export const vUserListAdminQuery = z.object({
  searchKeyword: z.string().optional(),
})
export type vUserListAdminQuery = z.infer<typeof vUserListAdminQuery>
