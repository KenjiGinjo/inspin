import type { ResCrowdfundingSupportList } from '@inspin/interfaces'
import { APP } from '@inspin/constants'
import { EnumCharacterCrowdfundingSupportStatus } from '@inspin/enums'
import { format } from 'date-fns'
import { navigate } from 'wouter/use-browser-location'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Divider } from './ui/divider'
import { Image } from './ui/image'

interface CrowdfundingOrderCardProps {
  data: ResCrowdfundingSupportList
}

export function CrowdfundingOrderCard({ data }: CrowdfundingOrderCardProps) {
  const getStatusColor = (status: EnumCharacterCrowdfundingSupportStatus) => {
    const statusColors: Record<EnumCharacterCrowdfundingSupportStatus, string> = {
      [EnumCharacterCrowdfundingSupportStatus.Pending]: 'bg-yellow-100 text-yellow-800',
      [EnumCharacterCrowdfundingSupportStatus.Success]: 'bg-green-100 text-green-800',
      [EnumCharacterCrowdfundingSupportStatus.Failed]: 'bg-red-100 text-red-800',
      [EnumCharacterCrowdfundingSupportStatus.Canceled]: 'bg-gray-100 text-gray-800',
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: EnumCharacterCrowdfundingSupportStatus) => {
    const statusTexts: Record<EnumCharacterCrowdfundingSupportStatus, string> = {
      [EnumCharacterCrowdfundingSupportStatus.Pending]: 'Pending',
      [EnumCharacterCrowdfundingSupportStatus.Success]: 'Success',
      [EnumCharacterCrowdfundingSupportStatus.Failed]: 'Failed',
      [EnumCharacterCrowdfundingSupportStatus.Canceled]: 'Canceled',
    }
    return statusTexts[status] || status
  }

  const isExpired = new Date(data.expiredAt) < new Date()
  const isPending = data.status === EnumCharacterCrowdfundingSupportStatus.Pending

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
        <div className="flex items-center gap-3">
          {data.character.illustration && (
            <Image
              src={data.character.illustration}
              alt={data.character.name}
              className="size-16 object-cover rounded"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-gray-700 truncate">
              {data.character.name}
            </div>
            <div className="text-xs text-gray-500">
              Crowdfunding Campaign
            </div>
            <div className="text-xs text-gray-600">
              {data.character.gender || 'No gender specified'}
            </div>
          </div>
        </div>

        <Divider />

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Support Amount:</span>
            <span className="font-medium">
              {APP.currencySymbol}{data.spec.price}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Diamonds Reward:</span>
            <span className="font-medium text-blue-600">
              {data.spec.diamond} 💎
            </span>
          </div>
        </div>

        {isPending && (
          <>
            <Divider />
            <div className="text-center p-2 bg-yellow-50 rounded">
              <div className="text-xs text-yellow-700 font-medium">
                {isExpired ? 'Order Expired' : 'Payment Required'}
              </div>
              {!isExpired && (
                <div className="text-xs text-yellow-600">
                  Expires: {format(new Date(data.expiredAt), 'MM/dd/yyyy HH:mm')}
                </div>
              )}
            </div>
          </>
        )}

        {data.status === EnumCharacterCrowdfundingSupportStatus.Success && (
          <>
            <Divider />
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="text-xs text-green-700 font-medium">
                Campaign Successful!
              </div>
              <div className="text-xs text-green-600">
                You will receive {data.spec.diamond} diamonds
              </div>
            </div>
          </>
        )}

        {data.status === EnumCharacterCrowdfundingSupportStatus.Failed && (
          <>
            <Divider />
            <div className="text-center p-2 bg-red-50 rounded">
              <div className="text-xs text-red-700 font-medium">
                Campaign Failed
              </div>
              <div className="text-xs text-red-600">
                You will be refunded
              </div>
            </div>
          </>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/crowdfunding-support/show/${data.id}`)}
          >
            View Details
          </Button>

          {isPending && !isExpired && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => navigate(`/pay/check-out/${data.id}/crowdfunding`)}
            >
              Pay Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
