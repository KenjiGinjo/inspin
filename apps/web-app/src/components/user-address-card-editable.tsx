import type { IUserAddress } from '@inspin/interfaces'
import { IconCommunityFill, IconEdit2Line, IconPhoneFill } from '@inspin/svg'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { navigate } from 'wouter/use-browser-location'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { $qc } from '@/query-client'
import { Request } from './request'
import { Button } from './ui/button'

export function UserAddressCardEditable({ data, onClick }: { data: IUserAddress, onClick?: () => void }) {
  const queryClient = useQueryClient()
  const userAddressId = data.id
  return (
    <Card className="mb-4" onClick={onClick}>
      <CardContent>
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

            {!data.isDefault && (
              <Request
                authGuard
                request={() => $qc['user-address'].setDefault[':userAddressId'].$post.mutation({
                  params: {
                    userAddressId,
                  },
                })}
                showLoading
                showModal
                showModalOption={{
                  title: 'Set as default',
                  description: 'Do you want to set this address as default?',
                }}
                onSuccess={() => {
                  $qc['user-address'].listForMine.$get.invalidateQueries(queryClient)
                }}
              >
                <div className="text-cyan-700 text-sm flex items-center mt-4">
                  Set as default
                </div>
              </Request>
            )}
          </div>

          <div className="absolute -top-2 -right-2 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/user-address/edit/${userAddressId}`)
              }}
            >
              <IconEdit2Line className="size-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
