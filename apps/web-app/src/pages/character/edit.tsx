import type { ICharacterBase } from '@inspin/interfaces'
import { vCharacterCreate } from '@inspin/validations'
import React from 'react'
import { toast } from 'sonner'
import { useParams } from 'wouter'
import { navigate } from 'wouter/use-browser-location'
import { CharacterForm } from '@/components/character-form'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Button } from '@/components/ui/button'
import { useSchemaPatch } from '@/hooks'
import { $qc } from '@/query-client'

function Page({ data }: { data: ICharacterBase }) {
  const defaultTab = data.illustration ? 'c_illustration' : 'c_homepage'
  const { form, dto, patch } = useSchemaPatch(vCharacterCreate, data)
  const [agree, setAgree] = React.useState(false)

  return (
    <div className="p-4">
      <Form.Form form={form} onChange={patch} className="space-y-5">
        <CharacterForm.Base defaultTab={defaultTab} />
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
        request={() => $qc.character[':characterId'].$patch.mutation({
          body: dto,
          params: { characterId: data.id },
        })}
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

export function PageCharacterEdit() {
  const { id } = useParams() as { id: string }

  return (
    <MainLayout>
      <Header.SubPage title="Edit Character" />
      <GuardAuthPage>
        <QueryData
          queryRoute={$qc.character[':characterId'].$get}
          queryArgs={{ params: { characterId: id } }}
          renderData={({ data }) => <Page data={data} />}
        />
      </GuardAuthPage>
    </MainLayout>
  )
}
