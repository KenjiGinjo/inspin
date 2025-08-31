import { EnumUserAddressPageFrom } from '@inspin/enums'
import { IconAddLargeLine } from '@inspin/svg'
import { useSearchParams } from 'wouter'
import { navigate } from 'wouter/use-browser-location'
import { Empty } from '@/components/empty'
import { FixBottomBar } from '@/components/fix-bottom-bar'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryList } from '@/components/query-list'
import { Button } from '@/components/ui/button'
import { UserAddressCardEditable } from '@/components/user-address-card-editable'
import { navBack } from '@/lib/navback'
import { $qc } from '@/query-client'

export function PageUserAddressList() {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') as EnumUserAddressPageFrom | undefined
  const orderId = searchParams.get('orderId')

  return (
    <MainLayout>
      <Header.SubPage title="Address Management" />
      <div className="p-4 max-w-4xl mx-auto">
        <QueryList
          refetchOnLoad
          queryRoute={$qc['user-address'].listForMine.$get}
          queryArgs={{}}
          renderItem={({ data }) => (
            <UserAddressCardEditable
              key={data.id}
              data={data}
              onClick={async () => {
                if (from === EnumUserAddressPageFrom.Checkout && orderId) {
                  await $qc['character-sale-order'][':characterSaleOrderId'].$put.mutation({
                    params: { characterSaleOrderId: orderId },
                    body: { userAddressId: data.id },
                  })
                  navBack()
                }

                if (from === EnumUserAddressPageFrom.Raffle && orderId) {
                  await $qc['raffle-entry-record'][':raffleEntryRecordId'].$put.mutation({
                    params: { raffleEntryRecordId: orderId },
                    body: { userAddressId: data.id },
                  })
                  navBack()
                }
              }}
            />
          )}
          renderEmpty={<Empty.Icon message="No address" />}
        />

        <FixBottomBar innerClassName="p-4">
          <Button
            onClick={() => navigate('/user-address/create')}
            className="w-full font-bold"
          >
            <IconAddLargeLine className="size-4 ml-1" />
            Add Address
          </Button>
        </FixBottomBar>
      </div>
    </MainLayout>
  )
}
