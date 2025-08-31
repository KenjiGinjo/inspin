import type { Context } from 'hono'
import { sign, verify } from 'hono/jwt'

const ALG = 'HS256'

/**
 * Sign a JSON Web Token (JWT) with the provided secret, subject, and expiration time.
 *
 * @param {object} options - The options for signing the JWT.
 * @param {string} options.secret - The secret key used to sign the JWT.
 * @param {string} options.sub - The subject of the JWT.
 * @param {number} options.exp - The expiration time of the JWT in seconds.
 *
 * @returns {Promise<string>} - A promise that resolves to the signed JWT.
 */
export async function jwtSign({ secret, sub, exp }: { secret: string, sub: string, exp: number }): Promise<string> {
  const now = new Date()
  const getTime = (date: Date) => Math.floor(date.getTime() / 1000)
  return await sign(
    { sub, exp: getTime(new Date(now.getTime() + exp * 1000)), nbf: getTime(now), iat: getTime(now) },
    secret,
    ALG,
  )
}

/**
 * Verify a JSON Web Token (JWT) with the provided secret and token.
 *
 * @param {object} options - The options for verifying the JWT.
 * @param {string} options.secret - The secret key used to verify the JWT.
 * @param {string} options.token - The JWT to be verified.
 *
 * @returns {Promise<any>} - A promise that resolves to the decoded payload of the JWT.
 */
export async function jwtVerify({ secret, token }: { secret: string, token: string }): Promise<any> {
  return await verify(token, secret, ALG)
}

/**
 * Creates a JWT response object with the provided token.
 *
 * @param {object} options - The options for creating the JWT response.
 * @param {string} options.token - The JWT token.
 *
 * @returns {object} - The JWT response object.
 * @property {string} token - The JWT token.
 * @property {string} type - The type of the token (Bearer).
 */
export function jwtResponse({ token }: { token: string }): { token: string, type: string } {
  return {
    token,
    type: 'Bearer',
  }
}

/**
 * Extracts the subject (sub) from a JWT token.
 *
 * @param {string} secret - The secret key used to verify the JWT token.
 * ctx - The context object containing the request information.
 *
 * @returns {Promise<false | string>} - A promise that resolves to the subject (sub) from the JWT token, or false if there is an error.
 */
export async function jwtExtractSub({ secret, ctx }: { secret: string, ctx: Context }): Promise<false | string> {
  try {
    const authorization = ctx.req.header('Authorization') || ''
    const token = authorization.replace(/^Bearer /i, '')

    const payload = await jwtVerify({ secret, token })
    return payload.sub
  }
  catch {
    return false
  }
}
