import type { ICharacterBase } from './character'

export interface ResRaffleShow extends ICharacterBase {
  sale: {
    spec: {
      id: string
      title: string
      description: string | null
      image: string | null
    }
  }
  raffle: {
    id: string
    title: string
    description: string | null
    image: string | null
    costDiamond: number
    guaranteeCount: number
    guaranteeCountForUser: number
    winRate: number
  }
}
