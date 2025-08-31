import { EnumUserAddressPageFrom } from '@inspin/enums'
import { vUserAddressCreate } from '@inspin/validations'
import { get } from 'radash'
import { useSearchParams } from 'wouter'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { UserAddressForm } from '@/components/user-address-form'
import { useSchemaPatch } from '@/hooks'
import { navBack } from '@/lib/navback'
import { $qc } from '@/query-client'

export function PageUserAddressCreate() {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') as EnumUserAddressPageFrom | undefined
  const orderId = searchParams.get('orderId')

  const { form, dto, patch } = useSchemaPatch(vUserAddressCreate, {
    tag: 'home',
    isDefault: true,
  })

  return (
    <MainLayout>
      <Header.SubPage title="Create Address" />
      <GuardAuthPage>
        <div className="p-4">
          <Form.Form form={form} onChange={patch} className="space-y-5">
            <UserAddressForm />
          </Form.Form>

          <Form.Submit
            form={form}
            authGuard
            request={() => $qc['user-address'].$post.mutation({ body: dto })}
            onSuccess={(res) => {
              if (from === EnumUserAddressPageFrom.Checkout && orderId) {
                const userAddressId = get<string>(res, 'body.data.userAddressId')
                $qc['character-sale-order'][':characterSaleOrderId'].$put.mutation({
                  params: { characterSaleOrderId: orderId },
                  body: { userAddressId },
                })
              }
              if (from === EnumUserAddressPageFrom.Raffle && orderId) {
                const userAddressId = get<string>(res, 'body.data.userAddressId')
                $qc['raffle-entry-record'][':raffleEntryRecordId'].$put.mutation({
                  params: { raffleEntryRecordId: orderId },
                  body: { userAddressId },
                })
              }
              navBack()
            }}
          >
            <Button className="w-full mt-8 font-bold">
              Submit
            </Button>
          </Form.Submit>
        </div>
      </GuardAuthPage>
    </MainLayout>
  )
}
