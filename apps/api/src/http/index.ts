import { Hono } from 'hono'
import { admin } from './admin'
import { adventure } from './adventure'
import { authentication } from './authentication'
import { user } from './user'
import { userTodo } from './userTodo'

export const route = new Hono()
  .route('/', admin)
  .route('/', authentication)
  .route('/', adventure)
  .route('/', user)
  .route('/', userTodo)
