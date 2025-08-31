import type { EnumCharacterSaleOrderStatus, EnumPayMethod } from '@inspin/enums'
import type { ResUserBase } from './user'
import type { IUserAddress } from './user-address'

export interface ICharacterSaleOrderItem {
  characterSaleSpecId: string
  quantity: number
  price: number

  characterSaleSpecTitle: string
  characterSaleSpecImage: string | null
  characterName: string
}

export interface ResCharacterSaleOrderList {
  id: string
  createdAt: string

  expiredAt: string

  items: ICharacterSaleOrderItem[]

  totalPrice: number
  shippingFee: number | null
  status: EnumCharacterSaleOrderStatus

  paidAt: string | null
  paymentMethod: EnumPayMethod | null

  no: string
}
export interface ResCharacterSaleOrderShow extends ResCharacterSaleOrderList {

  thirdPartyNo: string | null
  thirdPartyPayload: any

  address?: IUserAddress

  remark: string | null
}

export interface AdminCharacterSaleOrderList extends ResCharacterSaleOrderList {
  user: ResUserBase
}
