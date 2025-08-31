import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { ENV } from './env'
import { route } from './http'
import { errorHandler } from './utils'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: [ENV.URI_CLIENT, ENV.URI_ADMIN],
    allowHeaders: [
      'Content-Type',
      'Authorization',
    ],
    allowMethods: ['POST', 'PUT', 'PATCH', 'GET', 'OPTIONS', 'DELETE'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)

app.use(
  csrf({
    origin: [ENV.URI_CLIENT, ENV.URI_ADMIN],
  }),
)

app.route('/', route)

app.get('/', (c) => {
  return c.json({
    message: 'Hello World',
  })
})

app.use(logger())
app.onError(errorHandler)

if (ENV.APP_STAGE === 'dev') {
  // eslint-disable-next-line no-console
  console.log(`server: localhost:${ENV.PORT}`)
  showRoutes(app)
}

export const App = app
export type AppType = typeof route

if (ENV.APP_STAGE === 'prod') {
  Bun.serve({
    fetch: app.fetch,
    port: ENV.PORT,
  })
}

export default {
  port: ENV.PORT,
  fetch: app.fetch,
}
