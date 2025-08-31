import type { EnumCharacterCrowdfundingSupportStatus, EnumPayMethod } from '@inspin/enums'
import type { ICharacterBase } from './character'
import type { ICrowdfundingSpec } from './crowdfunding'
import type { ResUserBase } from './user'

export interface ResCrowdfundingSupportList {
  id: string
  createdAt: string
  expiredAt: string
  spec: ICrowdfundingSpec
  status: EnumCharacterCrowdfundingSupportStatus

  paidAt: string | null
  paymentMethod: EnumPayMethod | null
  no: string

  distributeAt: string | null
  character: ICharacterBase

  crowdfunding: {
    countCurrent: number
    countTarget: number
  }
}

export interface ResCrowdfundingSupportShow extends ResCrowdfundingSupportList {
  thirdPartyNo: string | null
  thirdPartyPayload: any

  remark: string | null
}

export interface AdminCrowdfundingSupportList extends ResCrowdfundingSupportList {
  user: ResUserBase
}
