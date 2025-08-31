import type { ResCharacterSaleOrderList } from '@inspin/interfaces'
import { APP } from '@inspin/constants'
import { EnumCharacterSaleOrderStatus } from '@inspin/enums'
import { format } from 'date-fns'
import { navigate } from 'wouter/use-browser-location'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Divider } from './ui/divider'
import { Image } from './ui/image'

interface FigurineOrderCardProps {
  data: ResCharacterSaleOrderList
}

export function FigurineOrderCard({ data }: FigurineOrderCardProps) {
  const getStatusColor = (status: EnumCharacterSaleOrderStatus) => {
    const statusColors: Record<EnumCharacterSaleOrderStatus, string> = {
      [EnumCharacterSaleOrderStatus.Unpaid]: 'bg-yellow-100 text-yellow-800',
      [EnumCharacterSaleOrderStatus.Undelivered]: 'bg-blue-100 text-blue-800',
      [EnumCharacterSaleOrderStatus.Unreceived]: 'bg-purple-100 text-purple-800',
      [EnumCharacterSaleOrderStatus.Uncommented]: 'bg-indigo-100 text-indigo-800',
      [EnumCharacterSaleOrderStatus.Completed]: 'bg-green-100 text-green-800',
      [EnumCharacterSaleOrderStatus.Cancelled]: 'bg-red-100 text-red-800',
      [EnumCharacterSaleOrderStatus.Refunding]: 'bg-orange-100 text-orange-800',
      [EnumCharacterSaleOrderStatus.Refunded]: 'bg-gray-100 text-gray-800',
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: EnumCharacterSaleOrderStatus) => {
    const statusTexts: Record<EnumCharacterSaleOrderStatus, string> = {
      [EnumCharacterSaleOrderStatus.Unpaid]: 'Unpaid',
      [EnumCharacterSaleOrderStatus.Undelivered]: 'Undelivered',
      [EnumCharacterSaleOrderStatus.Unreceived]: 'Unreceived',
      [EnumCharacterSaleOrderStatus.Uncommented]: 'Uncommented',
      [EnumCharacterSaleOrderStatus.Completed]: 'Completed',
      [EnumCharacterSaleOrderStatus.Cancelled]: 'Cancelled',
      [EnumCharacterSaleOrderStatus.Refunding]: 'Refunding',
      [EnumCharacterSaleOrderStatus.Refunded]: 'Refunded',
    }
    return statusTexts[status] || status
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono text-gray-600">
            Order #{data.no}
          </CardTitle>
          <Badge className={getStatusColor(data.status)}>
            {getStatusText(data.status)}
          </Badge>
        </div>
        <CardDescription className="text-xs text-gray-500">
          Created on {format(new Date(data.createdAt), 'MM/dd/yyyy HH:mm')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {data.items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {item.characterSaleSpecImage && (
              <Image
                src={item.characterSaleSpecImage}
                alt={item.characterSaleSpecTitle}
                className="size-16 object-cover rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-700 truncate">
                {item.characterSaleSpecTitle}
              </div>
              <div className="text-xs text-gray-500">
                {item.characterName} × {item.quantity}
              </div>
              <div className="text-xs text-gray-600">
                {APP.currencySymbol}{item.price} each
              </div>
            </div>
          </div>
        ))}

        <Divider />

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">
            {APP.currencySymbol}{data.totalPrice - (data.shippingFee || 0)}
          </span>
        </div>

        {data.shippingFee && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium">
              {APP.currencySymbol}{data.shippingFee}
            </span>
          </div>
        )}

        <Divider />

        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span className="text-blue-600">
            {APP.currencySymbol}{data.totalPrice}
          </span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/order/show/${data.id}`)}
          >
            View Details
          </Button>

          {data.status === EnumCharacterSaleOrderStatus.Unpaid && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => navigate(`/pay/check-out/${data.id}/figurine`)}
            >
              Pay Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
