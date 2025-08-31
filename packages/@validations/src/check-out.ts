import { z } from 'zod'

export const vCheckoutPayment = z.object({
  paymentMethod: z.enum(['stripe', 'paypal']),
  cardNumber: z.string().min(1, 'Card number is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  cvv: z.string().min(1, 'CVV is required'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
})
export type vCheckoutPayment = z.infer<typeof vCheckoutPayment>
