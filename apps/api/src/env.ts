import process from 'node:process'
import { z } from 'zod'

const schema = z.object({
  APP_STAGE: z.enum(['dev', 'prod']),
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  JWT_SECRET_ADMIN: z.string().optional().default(''),
  OPENAI_API_KEY: z.string().optional().default(''),
  OPENAI_BASE_URL: z.string().optional().default('https://api.openai.com/v1'),
})

export const ENV = schema.parse(process.env)
