import { useParams } from 'wouter'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'

function Page() {
  return (
    <>
      asd
    </>
  )
}
export function PageOrderShow() {
  const { orderId } = useParams() as { orderId: string }
  console.warn('orderId', orderId)

  return (
    <MainLayout>
      <Header.SubPage title="Order Detail" />
      <Page />
    </MainLayout>
  )
}
