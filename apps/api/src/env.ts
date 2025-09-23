import process from 'node:process'
import { parseEnv } from 'znv'
import { z } from 'zod'

const schema = {
  APP_STAGE: z.enum(['dev', 'prod']),
  PORT: z.number(),
  JWT_SECRET: z.string(),
}

export const ENV = parseEnv(process.env, schema)
