import type { IUserAddress } from '@inspin/interfaces'
import { IconDeleteBin6Line } from '@inspin/svg'
import { vUserAddressCreate } from '@inspin/validations'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { useParams } from 'wouter'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Request } from '@/components/request'
import { Button } from '@/components/ui/button'
import { UserAddressForm } from '@/components/user-address-form'
import { useSchemaPatch } from '@/hooks'
import { navBack } from '@/lib/navback'
import { $qc } from '@/query-client'

function Page({ data }: { data: IUserAddress }) {
  const { form, dto, patch } = useSchemaPatch(vUserAddressCreate, data)

  return (
    <div className="p-4">
      <Form.Form form={form} onChange={patch} className="space-y-5">
        <UserAddressForm />
      </Form.Form>

      <Form.Submit
        form={form}
        authGuard
        request={() => $qc['user-address'][':userAddressId'].$put.mutation({
          params: {
            userAddressId: data.id,
          },
          body: dto,
        })}
        onSuccess={() => {
          navBack()
        }}
      >
        <Button className="w-full mt-8 font-bold">
          Submit
        </Button>
      </Form.Submit>
    </div>
  )
}
export function PageUserAddressEdit() {
  const { userAddressId } = useParams() as { userAddressId: string }
  const queryClient = useQueryClient()

  return (
    <MainLayout>
      <Header.SubPage
        title="Edit Address"
        rightChild={(
          <Request
            request={() => $qc['user-address'][':userAddressId'].$delete.mutation({
              params: {
                userAddressId,
              },
            })}
            showModal
            showModalOption={{
              title: 'Delete Address',
              description: 'Are you sure you want to delete this address?',
            }}
            onSuccess={() => {
              $qc['user-address'].listForMine.$get.invalidateQueries(queryClient)
              navBack()
            }}
          >
            <Button variant="secondary" className="rounded-full">
              <IconDeleteBin6Line className="w-5 h-5" />
              <span>Delete</span>
            </Button>
          </Request>
        )}
      />
      <GuardAuthPage>
        <QueryData
          showLoadingOnFetching
          refetchOnLoad
          queryRoute={$qc['user-address'].show[':userAddressId'].$get}
          queryArgs={{ params: { userAddressId } }}
          renderData={({ data }) => {
            if (!data) {
              return null
            }

            return <Page data={data} />
          }}
        />
      </GuardAuthPage>
    </MainLayout>
  )
}
