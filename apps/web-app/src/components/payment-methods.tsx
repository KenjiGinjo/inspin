import { EnumPayMethod } from '@inspin/enums'
import { vCheckoutPayment } from '@inspin/validations'
import { useState } from 'react'
import { useSchemaPatch } from '@/hooks'
import { Form } from './form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export function PaymentMethods() {
  const { form, dto, patch } = useSchemaPatch(vCheckoutPayment)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<EnumPayMethod | ''>('')

  const handlePaymentMethodSelect = (method: EnumPayMethod) => {
    setSelectedPaymentMethod(method)
    form.setValue('paymentMethod', method)
  }
  console.warn('dto', dto)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payment Method</CardTitle>
        <CardDescription>Choose your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <Form.Form form={form} onChange={patch}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPaymentMethod === EnumPayMethod.Stripe
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePaymentMethodSelect(EnumPayMethod.Stripe)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    {selectedPaymentMethod === EnumPayMethod.Stripe && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">Credit Card (Stripe)</div>
                    <div className="text-sm text-gray-500">Pay with Visa, Mastercard, or other cards</div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPaymentMethod === EnumPayMethod.PayPal
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePaymentMethodSelect(EnumPayMethod.PayPal)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    {selectedPaymentMethod === EnumPayMethod.PayPal && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-gray-500">Pay with your PayPal account</div>
                  </div>
                </div>
              </div>
            </div>

            <Form.Input
              label="Card Number"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              className="mt-4"
            />

            <div className="grid grid-cols-2 gap-4">
              <Form.Input
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
              />
              <Form.Input
                label="CVV"
                name="cvv"
                placeholder="123"
                type="password"
              />
            </div>

            <Form.Input
              label="Cardholder Name"
              name="cardholderName"
              placeholder="John Doe"
            />
          </div>
        </Form.Form>
      </CardContent>
    </Card>
  )
}
