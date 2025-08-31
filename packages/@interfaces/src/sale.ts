export interface ResSaleSpecList {
  id: string
  title: string
  description: string | null
  image: string | null
  price: number
  preSalePrice: number
  stock: number
  saleCount: number
  raffleId: string | null
}
