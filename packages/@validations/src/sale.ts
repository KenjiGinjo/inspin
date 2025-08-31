import { z } from 'zod'

export const vSaleUpdate = z.object({
  preSalePrice: z.coerce.number({
    required_error: 'Pre sale price is required',
    invalid_type_error: 'Pre sale price must be a number',
  }).min(1, 'Pre sale price should be at least 100').max(1000000, 'Pre sale price should be less than 1000000'),
  preSaleCount: z.coerce.number({
    required_error: 'Pre sale count is required',
    invalid_type_error: 'Pre sale count must be a number',
  }).min(1, 'Pre sale count should be at least 100').max(1000000, 'Pre sale count should be less than 1000000'),
  preSaleEndAt: z.coerce.date({
    required_error: 'Pre sale end at is required',
    invalid_type_error: 'Pre sale end at must be a date',
  }),

  content: z.string(),
  images: z.array(z.string()).min(1, 'Images should be at least 1').max(8, 'Images should be less than 8'),

  salePrice: z.coerce.number({
    required_error: 'Sale price is required',
    invalid_type_error: 'Sale price must be a number',
  }).min(1, 'Sale price should be at least 100').max(1000000, 'Sale price should be less than 1000000'),
  saleCount: z.coerce.number({
    required_error: 'Sale count is required',
    invalid_type_error: 'Sale count must be a number',
  }).min(1, 'Sale count should be at least 100').max(1000000, 'Sale count should be less than 1000000'),
})
export type vSaleUpdate = z.infer<typeof vSaleUpdate>

export const vSaleSpecCreate = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.coerce.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }).min(1, 'Price should be at least 100').max(1000000, 'Price should be less than 1000000'),
  preSalePrice: z.coerce.number({
    required_error: 'Pre sale price is required',
    invalid_type_error: 'Pre sale price must be a number',
  }).min(1, 'Pre sale price should be at least 100').max(1000000, 'Pre sale price should be less than 1000000'),
  stock: z.coerce.number({
    required_error: 'Stock is required',
    invalid_type_error: 'Stock must be a number',
  }).min(1, 'Stock should be at least 100').max(1000000, 'Stock should be less than 1000000'),
  raffleId: z.string().optional(),
})
export type vSaleSpecCreate = z.infer<typeof vSaleSpecCreate>

export const vSaleSpecUpdate = vSaleSpecCreate
export type vSaleSpecUpdate = z.infer<typeof vSaleSpecUpdate>
