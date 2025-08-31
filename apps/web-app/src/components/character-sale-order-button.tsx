import type { ResCharacterSaleOrderShow } from '@inspin/interfaces'
import { EnumPayIntentType } from '@inspin/enums'
import { navigate } from 'wouter/use-browser-location'
import { $qc } from '@/query-client'
import { Agree } from './agree'
import { FixBottomBar } from './fix-bottom-bar'
import { Price } from './price'
import { Request } from './request'
import { Button } from './ui/button'
import { Divider } from './ui/divider'

export function CharacterSaleOrderButton({ data }: { data: ResCharacterSaleOrderShow }) {
  return (
    <FixBottomBar className="bg-white" innerClassName="flex flex-col gap-2 px-4">
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex gap-2 items-end">
          <div>Total:</div>
          <Price price={data.totalPrice + (data.shippingFee || 0)} size="sm" />
        </div>
        <Request
          request={() => $qc.pay.confirm.$post.mutation({
            body: {
              id: data.id,
              type: EnumPayIntentType.Figurine,
            },
          })}
          onSuccess={() => {
            navigate(`/pay/success/${data.id}/${EnumPayIntentType.Figurine}`, { replace: true })
          }}
        >
          <Button className="px-8 rounded-full font-bold w-1/2 shrink-0">Place Order</Button>
        </Request>
      </div>
      <Divider className="my-1" />
      <Agree.PlaceOrder />
    </FixBottomBar>
  )
}
