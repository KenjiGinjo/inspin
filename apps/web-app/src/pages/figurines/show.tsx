import type { ResFigurineShow } from '@inspin/interfaces'
import { useParams } from 'wouter'
import { ExpendedBlock } from '@/components/expended-block'
import { FigurineShowBar } from '@/components/figurine-show-bar'
import { FigurineShowIllustration } from '@/components/figurine-show-illustration'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Price } from '@/components/price'
import { QueryData } from '@/components/query-data'
import { DescSec } from '@/components/ui/desc-sec'
import { VoteShowContentInfo } from '@/components/vote-show-content'
import { $qc } from '@/query-client'

function Page({ data }: { data: ResFigurineShow }) {
  const sale = data.sale
  const isPreSale = new Date(sale.preSaleEndAt) > new Date()

  return (
    <>
      <FigurineShowIllustration data={data} />
      <div className="px-4 pt-6">
        <div className="flex justify-between items-end">
          {isPreSale && <Price price={sale.salePrice} discountPrice={sale.preSalePrice} />}
          {!isPreSale && <Price price={sale.salePrice} />}
          <div className="text-gray-400 text-sm">
            (Sold:
            {isPreSale ? sale.preSaleCount : sale.saleCount}
            )
          </div>
        </div>
        <DescSec title="Figurine Detail" desc={sale.content || ''} className="mt-8" />
        <ExpendedBlock maxHeight={375} buttonText="Discover More About the Voting Phase">
          <VoteShowContentInfo data={data} />
        </ExpendedBlock>
      </div>
      <FigurineShowBar data={data} />
    </>
  )
}
export function PageFigurineShow() {
  const { characterId } = useParams() as { characterId: string }

  return (
    <MainLayout>
      <Header.SubPage title="Figurine Sale" />
      <QueryData
        queryRoute={$qc.figurine.show[':characterId'].$get}
        queryArgs={{ params: { characterId } }}
        renderData={({ data }) => (
          <Page data={data} />
        )}
      />
    </MainLayout>
  )
}
