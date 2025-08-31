import type { ResUserBase, ResUserProfile } from '@inspin/interfaces'
import type { HonoResponse } from '../types'
import { join } from 'node:path'
import { vUserProfileUpdate } from '@inspin/validations'
import { db } from 'db'
import { Hono } from 'hono'
import { auth, authOptional } from '../middleware'
import { validate } from '../utils'
import { saveBase64Image } from '../utils/file'

export const adventure = new Hono()
  .basePath('/adventure')
  /** 获取冒险信息 */
  .get('/', authOptional(), async (c): Promise<HonoResponse<{ data: ResUserBase | null }>> => {
    const _user = c.get('user')

    // 查询用户是不是有 进行中的任务
    // 如果没有测显示 抽取
    // 如果有则显示进行中的任务
  })
