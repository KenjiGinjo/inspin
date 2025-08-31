import { z } from 'zod'

export const vAuthLoginByPassword = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required'),
})
export type vAuthLoginByPassword = z.infer<typeof vAuthLoginByPassword>

export const vSendEmailVerificationCode = z.object({
  email: z.string().email('email format is incorrect'),
})
export type vSendEmailVerificationCode = z.infer<typeof vSendEmailVerificationCode>

export const vAuthRegisterByEmail = z.object({
  email: z.string().email('email format is incorrect'),
  code: z.string().length(6, 'verification code must be 6 digits'),
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required'),
  confirmPassword: z.string().min(1, 'confirm password is required'),
})
export type vAuthRegisterByEmail = z.infer<typeof vAuthRegisterByEmail>

export const vAuthChangePassword = z.object({
  oldPassword: z.string().min(1, 'old password is required'),
  newPassword: z.string().min(1, 'new password is required'),
  confirmPassword: z.string().min(1, 'confirm password is required'),
})
export type vAuthChangePassword = z.infer<typeof vAuthChangePassword>
