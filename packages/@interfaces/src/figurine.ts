import type { ICharacterBase } from './character'

export interface ResFigurineList extends ICharacterBase {
  sale: {
    preSalePrice: number
    preSaleCount: number
    preSaleEndAt: string

    salePrice: number
    saleCount: number

    images: string[] | null
  }
}

export interface ResFigurineShow extends ICharacterBase {
  sale: {
    preSalePrice: number
    preSaleCount: number
    preSaleEndAt: string

    salePrice: number
    saleCount: number

    content: string | null
    images: string[] | null

    specs: {
      id: string
      title: string
      description: string | null
      image: string | null
      price: number
      preSalePrice: number
      stock: number
      raffle?: {
        id: string
        costDiamond: number
        guaranteeCount: number
      }
    }[]
  }

  crowdfunding: {
    images: string[] | null
  }

}
