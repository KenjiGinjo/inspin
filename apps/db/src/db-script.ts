import { existsSync } from 'node:fs'
import { dotenvLoad } from '@inspin/tools/extend'
import { rakeDb } from 'orchid-orm/migrations'
import { BaseTable } from './tables/_base'

if (existsSync('.env'))
  dotenvLoad('.env')

const databaseURL = process.env.DATABASE_URL
if (!databaseURL)
  throw new Error('DATABASE_URL is missing')

export const change = rakeDb(
  { databaseURL },
  {
    migrationsPath: './migrations',
    baseTable: BaseTable,
    dbPath: './tables/_db',
    snakeCase: true,
    migrationId: 'serial',
    import: path => import(path),
  },
)
