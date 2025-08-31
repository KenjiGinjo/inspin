import { readFile } from 'node:fs/promises'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/serve-static'
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

app.use('/illustration/*', serveStatic({
  root: './uploads',
  getContent: async (path, _c) => {
    try {
      const file = await readFile(path)
      const ext = path.split('.').pop()?.toLowerCase()

      const mimeTypes: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
      }

      const contentType = mimeTypes[ext || ''] || 'application/octet-stream'
      return new Response(file, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000', // 缓存1年
        },
      })
    }
    catch {
      return new Response('File not found', { status: 404 })
    }
  },
}))

app.use('/user-avatar/*', serveStatic({
  root: './uploads',
  getContent: async (path, _c) => {
    try {
      const file = await readFile(path)
      const ext = path.split('.').pop()?.toLowerCase()

      const mimeTypes: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
      }

      const contentType = mimeTypes[ext || ''] || 'application/octet-stream'
      return new Response(file, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000', // 缓存1年
        },
      })
    }
    catch {
      return new Response('File not found', { status: 404 })
    }
  },
}))

app.use(logger())
app.onError(errorHandler)
// TODO: maintenance mode

// api version

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
