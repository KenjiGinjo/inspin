import type { ResCrowdfundingSupportShow } from '@inspin/interfaces'
import { EnumPayIntentType } from '@inspin/enums'
import { navigate } from 'wouter/use-browser-location'
import { $qc } from '@/query-client'
import { Agree } from './agree'
import { FixBottomBar } from './fix-bottom-bar'
import { Request } from './request'
import { Button } from './ui/button'
import { Divider } from './ui/divider'

interface CrowdfundingSupportButtonProps {
  data: ResCrowdfundingSupportShow
}

export function CrowdfundingSupportButton({ data }: CrowdfundingSupportButtonProps) {
  return (
    <FixBottomBar className="bg-white" innerClassName="flex flex-col gap-2 px-4">
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex gap-2 items-end">
          <div>Support Amount:</div>
          <div className="font-bold text-lg">
            $
            {data.spec.price}
          </div>
        </div>
        <Request
          request={() => $qc.pay.confirm.$post.mutation({
            body: {
              id: data.id,
              type: EnumPayIntentType.CrowdfundingSupport,
            },
          })}
          onSuccess={() => {
            navigate(`/pay/success/${data.id}/${EnumPayIntentType.CrowdfundingSupport}`, { replace: true })
          }}
        >
          <Button className="px-8 rounded-full font-bold w-1/2 shrink-0">Confirm Support</Button>
        </Request>
      </div>
      <Divider className="my-1" />
      <Agree.PlaceOrder />
    </FixBottomBar>
  )
}
