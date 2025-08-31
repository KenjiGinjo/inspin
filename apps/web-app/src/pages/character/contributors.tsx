import { useParams } from 'wouter'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'

function Page() {
  return (
    <div className="p-4">
      asd
    </div>
  )
}

export function PageCharacterContributors() {
  const { characterId } = useParams() as { characterId: string }
  console.warn(characterId)
  return (
    <MainLayout>
      <Header.SubPage title="Contributors" />
      <Page />
    </MainLayout>
  )
}
