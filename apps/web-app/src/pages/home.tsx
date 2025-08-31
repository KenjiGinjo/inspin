import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { RaffleCard } from '@/components/raffle-card'
import { Tabbar } from '@/components/tabbar'

export function PageHome() {
  return (
    <MainLayout>
      <Header.MainPage color="pink" />
      <div className="container mx-auto px-4 py-6">
        <RaffleCard />
      </div>
      <Tabbar />
    </MainLayout>
  )
}
