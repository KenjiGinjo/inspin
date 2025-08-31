import { z } from 'zod'

export const vUserAddressCreate = z.object({
  name: z.string({ required_error: 'Name is required' }),
  phone: z.string({ required_error: 'Phone is required' }),

  zipCode: z.string({ required_error: 'Zip code is required' }),
  country: z.string({ required_error: 'Country is required' }),
  province: z.string({ required_error: 'Province is required' }),
  city: z.string({ required_error: 'City is required' }),
  area: z.string({ required_error: 'Area is required' }),
  address: z.string({ required_error: 'Address is required' }),

  tag: z.string({ required_error: 'Tag is required' }),

  isDefault: z.boolean({ required_error: 'Is default is required' }),

})
export type vUserAddressCreate = z.infer<typeof vUserAddressCreate>

export const vUserAddressUpdate = vUserAddressCreate.partial()
export type vUserAddressUpdate = z.infer<typeof vUserAddressUpdate>
