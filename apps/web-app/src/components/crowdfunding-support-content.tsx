import type { ResCrowdfundingSupportShow } from '@inspin/interfaces'
import { APP } from '@inspin/constants'
import { EnumCharacterCrowdfundingSupportStatus } from '@inspin/enums'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CrowdfundingProgressBar } from './crowdfunding-progress-bar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Divider } from './ui/divider'
import { Image } from './ui/image'

function Item({ label, value, bold }: { label: string, value: string, bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm">{label}</span>
      <span className={cn('text-sm', bold && 'font-medium text-gray-700')}>{value}</span>
    </div>
  )
}

export function CrowdfundingSupportContent({ data }: { data: ResCrowdfundingSupportShow }) {
  return (
    <Card className="text-gray-700">
      <CardHeader>
        <CardTitle className="text-lg">
          Support:
          <span className="font-bold ml-1">
            {data.character.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          {data.character.illustration && <Image src={data.character.illustration} alt={data.character.name} className="size-24 rounded shrink-0 mr-2" />}
          <div className="text-gray-700 text-sm w-full">
            <div className="font-bold mb-2">
              After Pay Success:
            </div>
            <CrowdfundingProgressBar current={data.crowdfunding.countCurrent + data.spec.price} target={data.crowdfunding.countTarget} />
          </div>
        </div>
        <CardDescription className="text-gray-700">
          Review your order details, and you will get
          <span className="font-bold mx-1">
            {`${data.spec.diamond} diamonds`}
          </span>
          if the campaign is successful.
        </CardDescription>
        <Divider className="mt-8" />
        <Item label="Order #" value={data.no} />
        {data.status === EnumCharacterCrowdfundingSupportStatus.Pending && <Item label="Expire At" value={format(data.expiredAt, 'MM/dd/yyyy HH:mm')} />}
        <Divider />
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>
            {`${APP.currencySymbol}${data.spec.price}`}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
