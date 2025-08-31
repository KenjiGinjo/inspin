import { Hono } from 'hono'
import { auth } from './auth'

export const admin = new Hono() //
  .basePath('/admin')
  .route('/', auth)
