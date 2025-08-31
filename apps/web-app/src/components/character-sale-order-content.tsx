import type { ResCharacterSaleOrderShow } from '@inspin/interfaces'
import { APP } from '@inspin/constants'
import { EnumCharacterSaleOrderStatus } from '@inspin/enums'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CharacterSaleSpec } from './character-sale-spec'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Divider } from './ui/divider'

function Item({ label, value, bold }: { label: string, value: string, bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm">{label}</span>
      <span className={cn('text-sm', bold && 'font-medium text-gray-700')}>{value}</span>
    </div>
  )
}

export function CharacterSaleOrderContent({ data }: { data: ResCharacterSaleOrderShow }) {
  return (
    <Card className="text-gray-700">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Item label="Order #" value={data.no} />

        {data.status === EnumCharacterSaleOrderStatus.Unpaid && <Item label="Expire At" value={format(data.expiredAt, 'MM/dd/yyyy HH:mm')} />}
        <Item label="Subtotal" value={`${APP.currencySymbol}${data.totalPrice}`} />
        <Item label="Shipping Fee" value={`${APP.currencySymbol}${data.shippingFee}`} />
        <Divider />
        {data.items.map((item, index) => <CharacterSaleSpec.OrderItem key={index} item={item} />)}

        <Divider />

        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>
            {`${APP.currencySymbol}${data.totalPrice + (data.shippingFee || 0)}`}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
