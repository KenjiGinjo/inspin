import type { ResRaffleShow } from '@inspin/interfaces'
import { IconSparkling2Fill, IconVipDiamondFill } from '@inspin/svg'
import { useSelector } from '@legendapp/state/react'
import { get } from 'radash'
import { navigate } from 'wouter/use-browser-location'
import { useUserState } from '@/hooks/user'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'
import { FixBottomBar } from './fix-bottom-bar'
import { Request } from './request'
import { Button } from './ui/button'
import { UserCard } from './user-card'

export function RaffleShowBar({ data }: { data: ResRaffleShow }) {
  const $stateUser = useSelector(() => stateUser.getData())
  const { refetch } = useUserState()

  return (

    <FixBottomBar className="bg-white" innerClassName="flex-col p-4">
      <div className="flex gap-2 justify-between w-full">
        <UserCard.AssetItem
          icon={<IconVipDiamondFill />}
          title="Available Diamonds"
          value={$stateUser?.diamond || 0}
          className="text-blue-500"
        />
        <UserCard.AssetItem
          icon={<IconSparkling2Fill />}
          title="Guaranteed Win"
          value={`${data.raffle.guaranteeCountForUser} / ${data.raffle.guaranteeCount}`}
          className="text-pink-500"
        />
      </div>
      <div className="flex gap-2 w-full py-4">
        <Request
          request={() => $qc.raffle.consume[':characterSaleSpecId'].$post.mutation({
            params: {
              characterSaleSpecId: data.sale.spec.id,
            },
          })}
          showLoading
          showModal
          showModalOption={{ description: `You are about to spend ${data.raffle.costDiamond} diamonds for an entry. Are you sure you want to proceed?` }}
          onSuccess={async (res) => {
            await refetch()
            const raffleEntryRecordId = get<string>(res, 'body.data.raffleEntryRecordId')
            navigate(`/raffle/entry-record/${raffleEntryRecordId}`)
          }}
        >
          <Button disabled={!$stateUser?.diamond} variant="destructive" className="px-8 rounded w-full bg-orange-500 font-bold">Enter Raffle</Button>
        </Request>
      </div>
    </FixBottomBar>
  )
}
