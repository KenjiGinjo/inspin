import type { EnumUserAddressPageFrom } from '@inspin/enums'
import type { IUserAddress } from '@inspin/interfaces'
import { IconAddLargeLine, IconArrowRightSLine, IconCommunityFill, IconPhoneFill } from '@inspin/svg'
import { navigate } from 'wouter/use-browser-location'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { $qc } from '@/query-client'
import { QueryData } from './query-data'
import { Button } from './ui/button'

function Content({ data, orderId, from }: { data?: IUserAddress | null, orderId: string, from: EnumUserAddressPageFrom }) {
  if (!data) {
    return (
      <Card className="mb-4">
        <CardContent>
          <div className="text-center text-gray-500 mb-4">No address data, please add one</div>
          <Button
            variant="outline"
            onClick={() => navigate(`/user-address/create?from=${from}&orderId=${orderId}`)}
            className="w-full font-bold"
          >
            <IconAddLargeLine className="size-4 ml-1" />
            Add Address
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-4">
      <CardContent onClick={() => {
        navigate(`/user-address/list?from=${from}&orderId=${orderId}`)
      }}
      >
        <div className="relative w-full">
          <div className="w-full">
            <div className="flex items-center mb-2 gap-2">
              <span className="font-semibold text-gray-900">{data.name}</span>
              {data.isDefault && (
                <Badge variant="secondary" className="text-xs">
                  Default
                </Badge>
              )}
              {data.tag && (
                <Badge variant="outline" className="text-xs">
                  {data.tag}
                </Badge>
              )}
            </div>
            <div className="text-gray-700 text-sm flex items-center">
              <IconPhoneFill className="size-4 shrink-0 text-gray-400 mr-1" />
              {data.phone}
            </div>
            <div className="text-gray-700 text-sm space-x-1 flex items-center flex-wrap">
              <IconCommunityFill className="size-4 shrink-0 text-gray-400" />
              <span>{data.country}</span>
              <span>{data.province}</span>
              <span>{data.city}</span>
              <span>{data.area}</span>
              <span>{data.address}</span>
              <span>{data.zipCode}</span>
            </div>
          </div>

          <div className="absolute top-2 -right-2 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
            >
              <IconArrowRightSLine className="size-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function UserAddressCardSelector({ orderId, userAddressId, from }: { orderId: string, userAddressId?: string | null, from: EnumUserAddressPageFrom }) {
  if (userAddressId) {
    return (
      <QueryData
        showLoadingOnFetching
        refetchOnLoad
        queryRoute={$qc['user-address'].show[':userAddressId'].$get}
        queryArgs={{ params: { userAddressId } }}
        renderData={({ data }) => <Content data={data} orderId={orderId} from={from} />}
      />
    )
  }

  return (
    <QueryData
      queryRoute={$qc['user-address'].default.$get}
      showLoadingOnFetching
      refetchOnLoad
      queryArgs={{}}
      renderData={({ data }) => <Content data={data} orderId={orderId} from={from} />}
    />
  )
}
