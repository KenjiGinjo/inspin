import { Hono } from 'hono'
import { admin } from './admin'
import { authentication } from './authentication'
import { user } from './user'

export const route = new Hono()
  .route('/', admin)
  .route('/', authentication)
  .route('/', user)
