import { APP } from '@inspin/constants'
import { vAuthLoginByPassword } from '@inspin/validations'
import { get } from 'radash'
import { signin } from '@/components/auth/signin'
import { Form } from '@/components/form'
import { MainLayout } from '@/components/layout'
import { NotificationBar } from '@/components/notification-bar'
import { Slogan } from '@/components/slogan'
import { Button } from '@/components/ui/button'
import { useSchemaPatch } from '@/hooks'
import { useUserState } from '@/hooks/user'
import { navBack } from '@/lib/navback'
import { $qc } from '@/query-client'

export function PageAuthLogin() {
  const { form, dto, patch } = useSchemaPatch(vAuthLoginByPassword)
  const { refetch } = useUserState()

  return (
    <MainLayout>
      <NotificationBar>
        {`${APP.appName} has updated the Privacy Policy as of June 29, 2025. Revision history`}
      </NotificationBar>
      <Slogan.Icon text="Bring Your Favorite Characters to Life!" className="mt-[60px]" />
      <div className="p-4">
        <Form.Form form={form} onChange={patch}>
          <Form.Input label="Username" name="username" placeholder="e-mail or username" />
          <Form.Input label="Password" name="password" type="password" placeholder="password" />
        </Form.Form>
        <Form.Submit
          form={form}
          request={() => $qc.authentication['login-by-password'].$post.mutation({ body: dto })}
          onSuccess={async (res) => {
            const meta = get(res, 'body.meta', undefined)
            await signin(meta)
            await refetch()
            navBack('/user', true)
          }}
        >
          <Button disabled={!form.formState.isValid} className="w-full rounded-full mt-4 font-bold">
            Log In
          </Button>
        </Form.Submit>
      </div>
    </MainLayout>
  )
}
