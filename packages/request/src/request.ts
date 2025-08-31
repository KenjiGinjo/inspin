import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { methodSpoofing } from './interceptors/method-spoofing'
import { normalizeError } from './interceptors/normalize-error'
import { normalizePath } from './interceptors/normalize-path'
import { normalizeResponse } from './interceptors/normalize-response'

export function createInstance({ baseURL, headers }: { baseURL: string, headers?: Record<string, string> }) {
  const instance = axios.create({ baseURL, headers })

  instance.interceptors.request.use(methodSpoofing)
  instance.interceptors.request.use(normalizePath)
  instance.interceptors.response.use(normalizeResponse, normalizeError)

  return instance
}

export function createRequest({
  baseURL,
  headers,
  tokenProvider,
}: {
  baseURL: string
  headers?: Record<string, string>
  tokenProvider: () => Promise<string>
}) {
  const instance = createInstance({ baseURL, headers })

  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token = await tokenProvider()
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`

    return config
  })

  return instance
}
