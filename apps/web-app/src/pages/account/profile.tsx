import type { ResUserProfile } from '@inspin/interfaces'
import { vUserProfileUpdate } from '@inspin/validations'
import { toast } from 'sonner'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { ProfileForm } from '@/components/profile-form'
import { QueryData } from '@/components/query-data'
import { Button } from '@/components/ui/button'
import { useSchemaPatch } from '@/hooks'
import { useUserState } from '@/hooks/user'
import { navBack } from '@/lib/navback'
import { $qc } from '@/query-client'

function Page({ data }: { data: ResUserProfile }) {
  const { refetch } = useUserState()
  const { form, dto, patch } = useSchemaPatch(vUserProfileUpdate, data)

  return (
    <div className="p-4">
      <Form.Form form={form} onChange={patch} className="space-y-5">
        <ProfileForm />
      </Form.Form>
      <Form.Submit
        form={form}
        authGuard
        request={() => $qc.user.profile.$put.mutation({ body: dto })}
        onSuccess={async () => {
          await refetch()
          toast.success('Profile updated', {
            description: 'Your profile has been updated successfully',
          })
          navBack()
        }}
      >
        <Button className="w-full rounded-full mt-4 font-bold">
          Submit
        </Button>
      </Form.Submit>

    </div>
  )
}

export function PageAccountProfile() {
  return (
    <MainLayout>
      <Header.SubPage title="Profile Setting" />
      <GuardAuthPage>
        <QueryData
          showLoadingOnFetching
          refetchOnLoad
          queryRoute={$qc.user.profile.$get}
          queryArgs={{}}
          renderData={({ data }) => <Page data={data} />}
        />
      </GuardAuthPage>
    </MainLayout>
  )
}
