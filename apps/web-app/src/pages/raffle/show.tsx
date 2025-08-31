import type { ResRaffleShow } from '@inspin/interfaces'
import { useParams } from 'wouter'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { RaffleShowBar } from '@/components/raffle-show-bar'
import { RaffleShowContent } from '@/components/raffle-show-content'
import { RaffleShowHeader } from '@/components/raffle-show-header'
import { $qc } from '@/query-client'

function Page({ data }: { data: ResRaffleShow }) {
  return (
    <div className="p-4">
      <RaffleShowHeader data={data} />
      <RaffleShowContent data={data} />
      <RaffleShowBar data={data} />
    </div>
  )
}
export function PageRaffleShow() {
  const { characterSaleSpecId } = useParams() as { characterSaleSpecId: string }

  return (
    <MainLayout>
      <Header.SubPage title="Figurine Raffle Event" />
      <QueryData
        refetchOnLoad
        showLoadingOnFetching
        queryRoute={$qc.raffle.show[':characterSaleSpecId'].$get}
        queryArgs={{ params: { characterSaleSpecId } }}
        renderData={({ data }) => (
          <Page data={data} />
        )}
      />
    </MainLayout>
  )
}
