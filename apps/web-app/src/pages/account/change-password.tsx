import { vAuthChangePassword } from '@inspin/validations'
import { toast } from 'sonner'
import { navigate } from 'wouter/use-browser-location'
import { ChangePasswordForm } from '@/components/change-password-form'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useSchemaPatch } from '@/hooks'
import { $qc } from '@/query-client'

export function PageAccountChangePassword() {
  const { form, dto, patch } = useSchemaPatch(vAuthChangePassword)

  return (
    <MainLayout>
      <Header.SubPage title="Change Password" />
      <GuardAuthPage>
        <div className="p-4 max-w-md mx-auto">
          <p className="text-sm text-gray-600 mb-6">
            Change your password to keep your account secure. Make sure to choose a strong password that you haven't used elsewhere.
          </p>

          <Form.Form form={form} onChange={patch} className="space-y-4">
            <ChangePasswordForm />
          </Form.Form>
          <Form.Submit
            form={form}
            request={() => $qc.authentication['change-password'].$put.mutation({ body: dto })}
            onSuccess={() => {
              toast.success('Password changed successfully', {
                description: 'Your password has been updated',
              })
              navigate('/account/settings', { replace: true })
            }}
          >
            <Button disabled={!form.formState.isValid} className="w-full">
              Update Password
            </Button>
          </Form.Submit>
        </div>
      </GuardAuthPage>
    </MainLayout>
  )
}
