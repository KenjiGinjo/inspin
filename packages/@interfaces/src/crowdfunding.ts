import type { EnumCharacterCrowdfundingStatus } from '@inspin/enums'
import type { ICharacterBase } from './character'

export interface ICrowdfundingSpec {
  id: string
  price: number
  diamond: number
}

export interface ResCrowdfundingList extends ICharacterBase {
  crowdfunding: {
    status: EnumCharacterCrowdfundingStatus
    countCurrent: number
    countTarget: number
    endAt: string
    images: string[] | null
  }
}

export interface ResCrowdfundingShow extends ICharacterBase {
  crowdfunding: {
    status: EnumCharacterCrowdfundingStatus
    countCurrent: number
    countTarget: number
    endAt: string
    specs: ICrowdfundingSpec[]
    images: string[] | null
  }
}

export interface ResCrowdfundingSpecList {
  id: string
  price: number
  diamond: number
}
