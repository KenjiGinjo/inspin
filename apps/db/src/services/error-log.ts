import { ERROR_CODE } from '@inspin/constants'
import { EnumErrorLogType } from '@inspin/enums'
import { db } from '..'

export const errorLog = {
  thirdPartyPay: async (e: Error, body: Record<string, any>) => {
    await db.errorLog.create({
      type: EnumErrorLogType.ThirdPartyPay,
      code: ERROR_CODE.ThirdPartyPayError,
      detail: e.message,
      path: '',
      method: '',
      body,
      headers: {},
      stack: e.stack,
    })
  },
}
