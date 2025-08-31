import type { ResRaffleEntryRecord } from '@inspin/interfaces'
import { EnumRaffleTargetType, EnumUserAddressPageFrom } from '@inspin/enums'
import { useParams } from 'wouter'
import { FixBottomBar } from '@/components/fix-bottom-bar'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { UserAddressCardSelector } from '@/components/user-address-card-selector'
import { navBack } from '@/lib/navback'
import { $qc } from '@/query-client'

function Success({ data }: { data: ResRaffleEntryRecord }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-14">
      <img src="/raffle-success.png" alt="raffle-entry-record" />
      <div className="text-3xl font-bold text-gray-700">Congratulations!</div>
      {data.targetType === EnumRaffleTargetType.FigurineSpecId && (
        <QueryData
          refetchOnLoad
          showLoadingOnFetching
          queryRoute={$qc.raffle.show[':characterSaleSpecId'].$get}
          queryArgs={{ params: { characterSaleSpecId: data.targetId } }}
          renderData={({ data }) => (
            <div className="text-gray-700 mt-4">
              You have successfully obtained the
              <b>
                {` ${data.sale.spec.title} - ${data.name}! `}
              </b>
              Please fill in your shipping information to receive your prize.
            </div>
          )}
        />
      )}
    </div>
  )
}

function Failed() {
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-14">
      <img src="/raffle-failed.png" alt="raffle-entry-record" />
      <div className="text-3xl font-bold text-gray-700">Bad Luck!</div>
      <div className="text-gray-700 mt-4">This entry was not successful. Better luck next time! Your guaranteed entry count has increased.</div>
    </div>
  )
}

function Page({ data }: { data: ResRaffleEntryRecord }) {
  const isDistributed = data.isDistribute
  const isWin = data.isWin

  return (
    <div>
      {isWin && <Success data={data} />}
      {!isWin && <Failed />}
      <FixBottomBar className="border-0" innerClassName="flex-col px-4 pb-12 gap-4">

        {!isDistributed && isWin && (
          <div className="w-full">
            <Divider className="mb-4" />
            <div className="text-gray-700 px-4 mb-4">We'll distribute the reward to you according to the address you provided in 2-3 business days.</div>
            <UserAddressCardSelector
              orderId={data.id}
              userAddressId={data.userAddressId}
              from={EnumUserAddressPageFrom.Raffle}
            />
            <Divider className="my-4" />
          </div>
        )}
        {(isWin && !isDistributed) && <Button variant="outline" className="rounded-full w-full text-gray-400" onClick={() => navBack()}>Got it. I've filled in the address. Close this page now.</Button>}
        {(!isWin || (isWin && isDistributed)) && <Button variant="outline" className="rounded-full w-full text-gray-400" onClick={() => navBack()}>Close</Button>}
      </FixBottomBar>
    </div>
  )
}

export function PageRaffleEntryRecord() {
  const { raffleEntryRecordId } = useParams() as { raffleEntryRecordId: string }

  return (
    <MainLayout className="min-h-auto!">
      <QueryData
        refetchOnLoad
        showLoadingOnFetching
        queryRoute={$qc['raffle-entry-record'].show[':raffleEntryRecordId'].$get}
        queryArgs={{ params: { raffleEntryRecordId } }}
        renderData={({ data }) => (
          <Page data={data} />
        )}
      />
    </MainLayout>
  )
}
