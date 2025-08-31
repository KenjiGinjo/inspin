import type { ResCrowdfundingShow } from '@inspin/interfaces'
import { useParams } from 'wouter'
import { CrowdfundingShowBar } from '@/components/crowdfunding-show-bar'
import { CrowdfundingShowContent } from '@/components/crowdfunding-show-content'
import { CrowdfundingShowIllustration } from '@/components/crowdfunding-show-illustration'
import { ExpendedBlock } from '@/components/expended-block'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { VoteShowContentAnalysis, VoteShowContentInfo } from '@/components/vote-show-content'
import { $qc } from '@/query-client'

function Page({ data }: { data: ResCrowdfundingShow }) {
  return (
    <>
      <CrowdfundingShowIllustration data={data} />
      <ExpendedBlock maxHeight={375} buttonText="Discover More About the Voting Phase">
        <div className="px-4">
          <VoteShowContentAnalysis data={data} />
          <VoteShowContentInfo data={data} />
        </div>
      </ExpendedBlock>
      <CrowdfundingShowContent />
      <CrowdfundingShowBar data={data} />
    </>
  )
}
export function PageCrowdfundingShow() {
  const { characterId } = useParams() as { characterId: string }

  return (
    <MainLayout>
      <Header.SubPage title="Figurine Crowdfunding" />
      <QueryData
        queryRoute={$qc.crowdfunding.show[':characterId'].$get}
        queryArgs={{ params: { characterId } }}
        renderData={({ data }) => (
          <Page data={data} />
        )}
      />
    </MainLayout>
  )
}
