export interface IUserAddress {
  id: string

  name: string
  phone: string

  zipCode: string | null
  country: string | null
  province: string | null
  city: string | null
  area: string | null
  address: string | null
  tag: string | null

  isDefault: boolean
}
