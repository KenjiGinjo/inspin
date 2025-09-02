import { z } from 'zod'
import { vPassword, vUsername } from './_utils'

export const vAuthLoginByPassword = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required'),
})
export type vAuthLoginByPassword = z.infer<typeof vAuthLoginByPassword>

export const vAuthRegister = z.object({
  username: vUsername,
  password: vPassword,
  confirmPassword: z.string().min(1, 'confirm password is required'),
})
export type vAuthRegister = z.infer<typeof vAuthRegister>

export const vAuthChangePassword = z.object({
  oldPassword: z.string().min(1, 'old password is required'),
  newPassword: vPassword,
  confirmPassword: z.string().min(1, 'confirm password is required'),
})
export type vAuthChangePassword = z.infer<typeof vAuthChangePassword>
