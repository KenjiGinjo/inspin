import { vCharacterCreate } from '@inspin/validations'
import React from 'react'
import { toast } from 'sonner'
import { navigate } from 'wouter/use-browser-location'
import { CharacterForm } from '@/components/character-form'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useSchemaPatch } from '@/hooks'
import { $qc } from '@/query-client'

function Page() {
  const { form, dto, patch } = useSchemaPatch(vCharacterCreate)
  const [agree, setAgree] = React.useState(false)

  return (
    <div className="p-4">
      <Form.Form form={form} onChange={patch} className="space-y-5">
        <CharacterForm.Base />
      </Form.Form>
      <CharacterForm.Agree setAgree={setAgree} />
      <Form.Submit
        form={form}
        authGuard
        onBeforeRequest={() => {
          if (!agree) {
            toast.error('Please agree to the submission rules and terms of service.')
            return false
          }
          return true
        }}
        request={() => $qc.character.$post.mutation({ body: dto })}
        onSuccess={() => {
          navigate(`/account/campaigns`, { replace: true })
        }}
      >
        <Button className="w-full rounded-full mt-4 font-bold">
          Submit
        </Button>
      </Form.Submit>

      <CharacterForm.Desc />
    </div>
  )
}

export function PageCharacterCreate() {
  return (
    <MainLayout>
      <Header.SubPage title="Create a Vote" />
      <GuardAuthPage>
        <Page />
      </GuardAuthPage>
    </MainLayout>
  )
}
