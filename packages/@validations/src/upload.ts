import { z } from 'zod'

export const vUploadUserAvatar = z.object({
  avatar: z.string({ required_error: 'Avatar is required' }),
})
export type vUploadUserAvatar = z.infer<typeof vUploadUserAvatar>
