import { z } from 'zod'
import { vId } from './_utils'

export const vFigurineItem = z.object({
  characterSaleSpecId: vId,
  quantity: z.number({ invalid_type_error: 'Quantity must be a number', required_error: 'Quantity is required' }),
  price: z.number({ invalid_type_error: 'Price must be a number', required_error: 'Price is required' }),

  characterSaleSpecTitle: z.string({ required_error: 'Character sale spec title is required' }),
  characterSaleSpecImage: z.string().nullable(),
  characterName: z.string({ required_error: 'Character name is required' }),
})
export type vFigurineItem = z.infer<typeof vFigurineItem>

export const vFigurineItems = z.array(vFigurineItem)
export type vFigurineItems = z.infer<typeof vFigurineItems>

export const vFigurineRaffleItem = z.object({
  characterSaleSpecId: vId,
})
export type vFigurineRaffleItem = z.infer<typeof vFigurineRaffleItem>

export const vFigurineListQuery = z.object({
  orderBy: z.enum(['latest', 'mostView']),
  genre: z.string().optional(),
  name: z.string().optional(),
})
export type vFigurineListQuery = z.infer<typeof vFigurineListQuery>
