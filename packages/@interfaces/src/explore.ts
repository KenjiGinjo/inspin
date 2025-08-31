import type { EnumCharacterCrowdfundingStatus, EnumCharacterVoteStatus } from '@inspin/enums'
import type { ICharacterBase } from './character'

export interface ResExploreList extends ICharacterBase {
  vote: {
    status: EnumCharacterVoteStatus
    countCurrent: number
    countTarget: number
  }
  crowdfunding?: {
    status: EnumCharacterCrowdfundingStatus
    countCurrent: number
    countTarget: number
    endAt: string
    images: string[] | null
  }
}
