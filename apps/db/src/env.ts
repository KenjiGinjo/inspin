import { z } from 'zod'

const schema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_LOG: z
    .enum(['true', 'false', '1', '0'])
    .optional()
    .default('false')
    .transform(v => v === 'true' || v === '1'),
})

export const ENV = schema.parse(process.env)
