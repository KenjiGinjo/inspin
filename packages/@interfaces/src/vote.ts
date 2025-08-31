import type { EnumCharacterVoteStatus } from '@inspin/enums'
import type { ICharacterBase } from './character'

export interface ResVoteShow extends ICharacterBase {
  vote: {
    status: EnumCharacterVoteStatus
    countCurrent: number
    countTarget: number
  }
}
