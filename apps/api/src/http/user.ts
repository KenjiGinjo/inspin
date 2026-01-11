import type { ResUserBase, ResUserProfile } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { createOpenAI } from '@ai-sdk/openai'
import {
  aiDocumentFormats,
  injectDocumentStateMessages,
  toolDefinitionsToToolSet,
} from '@blocknote/xl-ai/server'
import { vUserProfileUpdate } from '@inspin/validations'
import { convertToModelMessages, streamText } from 'ai'
import { db } from 'db'
import { Hono } from 'hono'
import { auth, authOptional } from '../middleware'
import { validate } from '../utils'

// Setup your model
const model = createOpenAI({
  apiKey: 'sk-y9zhB4quE92gccRH7dDbE19d9873486b82B60e3cDd671592',
  baseURL: 'https://api.gpt.ge/v1',
})('gpt-4o')

export const user = new Hono()
  .basePath('/user')
  .post('/chat', async (c) => {
    const { messages, toolDefinitions } = await c.req.json()

    const result = streamText({
      model,
      system: aiDocumentFormats.html.systemPrompt,
      messages: convertToModelMessages(injectDocumentStateMessages(messages)),
      tools: toolDefinitionsToToolSet(toolDefinitions),
      toolChoice: 'required',
    })

    return result.toUIMessageStreamResponse()
  })
  /** 用户状态 */
  .get('/state', authOptional(), async (c): Promise<HonoResponse<{ data: ResUserBase | null }>> => {
    const _user = c.get('user')

    if (!_user) {
      return c.json({
        data: null,
      })
    }

    const userId = _user.id
    const profile = await db.profile.findBy({ userId })

    return c.json({
      data: {
        id: userId,
        profile: {
          nickname: profile.nickname,
          avatar: profile.avatar,
        },
      },
    })
  })

  /** 用户信息 */
  .get('/profile', auth(), async (c): Promise<HonoResponse<{ data: ResUserProfile }>> => {
    const user = c.get('user')

    const data = await db.profile.findBy({ userId: user.id })

    return c.json({ data })
  })

  /** 更新用户信息 */
  .put('/profile', auth(), validate('json', vUserProfileUpdate), async (c) => {
    const dto = c.req.valid('json')

    const user = c.get('user')

    await db.profile.findBy({ userId: user.id }).update(dto)

    return c.body(null, 200)
  })
