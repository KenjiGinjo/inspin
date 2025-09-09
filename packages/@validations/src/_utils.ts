import { z } from 'zod'

export const vIp = z.string().ip({ message: 'IP address format is incorrect' })

export const vId = z.string().cuid2('resource ID format is incorrect')

export const vPassword = z
  .string({
    required_error: '密码不能为空',
    invalid_type_error: '密码必须是字符串',
  })
  .min(8, '密码至少需要8位字符')
  .max(128, '密码不能超过128位字符')

// 用户名验证：3-20位，只能包含字母、数字、下划线和连字符
export const vUsername = z
  .string({
    required_error: '用户名不能为空',
    invalid_type_error: '用户名必须是字符串',
  })
  .min(3, '用户名至少需要3位字符')
  .max(20, '用户名不能超过20位字符')
  .regex(/^[\w-]+$/, '用户名只能包含字母、数字、下划线和连字符')
  .refine(val => !val.startsWith('-') && !val.endsWith('-'), '用户名不能以连字符开头或结尾')
  .refine(val => !val.startsWith('_') && !val.endsWith('_'), '用户名不能以下划线开头或结尾')

export function vIds<Args extends string[]>(...ids: Args): z.ZodObject<{ [T in Args[number]]: z.ZodString }> {
  return z.object(ids.reduce((a, v) => ({ ...a, [v]: vId }), {})) as any
}
export function vStrings<Args extends string[]>(...strings: Args): z.ZodObject<{ [T in Args[number]]: z.ZodString }> {
  return z.object(strings.reduce((a, v) => ({ ...a, [v]: z.string() }), {})) as any
}

export const zPhone = z
  .string({
    required_error: '手机号不能为空',
    invalid_type_error: '手机号必须是字符串',
  })
  .regex(/^1[3-9]\d{9}$/, '手机号格式错误')
