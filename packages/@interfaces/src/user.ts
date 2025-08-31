export interface ResUserBase {
  id: string
  profile: {
    nickname: string | null
    avatar: string | null
  }
}

export interface IUserState {
  id: string
  profileNickname: string | null
  profileAvatar: string | null

  voteToken: number
  diamond: number

  isDistributedVoteToken: boolean
}

export interface ResUserProfile {
  id: string
  nickname: string | null
  avatar: string | null
  bio: string
  userId: string

  createdAt: string
  updatedAt: string
}

export interface ResUserListForAdmin extends ResUserBase {
  createdAt: string
  updatedAt: string

  voteToken: number
  diamond: number

  campaign: number

  crowdfundingPaid: number
  crowdfundingUnpaid: number
  figurinePaid: number
  figurineUnpaid: number
  raffleCount: number

  isDistributedVoteToken: boolean

}
