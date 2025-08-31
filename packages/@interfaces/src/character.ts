import type { EnumCharacterCrowdfundingStatus, EnumCharacterSaleStatus, EnumCharacterStatus, EnumCharacterVoteStatus } from '@inspin/enums'
import type { ResUserBase } from './user'

export interface ICharacterBase {
  id: string

  createdAt: string

  name: string
  gender: string | null
  description: string | null
  website: string | null
  illustration: string | null
  genre: string | null
  note: string | null

  creatorName: string | null
  creatorWebsite: string | null

  countCollect: number
  countView: number

  status: EnumCharacterStatus

  user: ResUserBase

  isCollectedForCurrentUser: boolean
}

export interface ResCharacterPhasesForList {
  id: string

  createdAt: string

  name: string
  gender: string | null
  description: string | null
  website: string | null
  illustration: string | null
  genre: string | null
  note: string | null

  creatorName: string | null
  creatorWebsite: string | null

  countCollect: number
  countView: number

  status: EnumCharacterStatus

  user: ResUserBase

  vote: {
    status: EnumCharacterVoteStatus
    countCurrent: number
    countTarget: number
  }

  crowdfunding: {
    status: EnumCharacterCrowdfundingStatus
    countCurrent: number
    countTarget: number
    endAt: string
    images: string[] | null
  }
  sale: {
    status: EnumCharacterSaleStatus
    preSalePrice: number
    preSaleCount: number
    preSaleEndAt: string

    salePrice: number
    saleCount: number
    images: string[] | null
  }
}

export interface ResCharacterPhasesForShow {
  id: string

  createdAt: string

  name: string
  gender: string | null
  description: string | null
  website: string | null
  illustration: string | null
  genre: string | null
  note: string | null

  creatorName: string | null
  creatorWebsite: string | null

  countCollect: number
  countView: number

  status: EnumCharacterStatus

  user: ResUserBase

  vote: {
    status: EnumCharacterVoteStatus
    countCurrent: number
    countTarget: number
  }

  crowdfunding: {
    status: EnumCharacterCrowdfundingStatus
    countCurrent: number
    countTarget: number
    endAt: string
    images: string[] | null
    specs: {
      id: string
      price: number
      diamond: number
    }[]
  }

  sale: {
    status: EnumCharacterSaleStatus
    preSalePrice: number
    preSaleCount: number
    preSaleEndAt: string

    content: string | null

    salePrice: number
    saleCount: number
    images: string[] | null

    specs: {
      id: string
      title: string
      description: string | null
      image: string | null
      price: number
      preSalePrice: number
      stock: number
      saleCount: number
      raffleId: string | null | undefined
    }[]
  }
}
