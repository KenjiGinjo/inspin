import type { ResVoteShow } from '@inspin/interfaces'
import { useParams } from 'wouter'
import { FixSocialTools } from '@/components/fix-social-tools'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { VoteShowBar } from '@/components/vote-show-bar'
import { VoteShowContentAnalysis, VoteShowContentInfo } from '@/components/vote-show-content'
import { VoteShowIllustration } from '@/components/vote-show-illustration'
import { $qc } from '@/query-client'
import { stateSocial } from '@/states'

function Page({ data }: { data: ResVoteShow }) {
  return (
    <>
      <VoteShowIllustration data={data} />
      <div className="px-4">
        <VoteShowContentAnalysis data={data} />
        <VoteShowContentInfo data={data} />
      </div>
      <FixSocialTools data={data} />
      <VoteShowBar data={data} />
    </>
  )
}

export function PageVoteShow() {
  const { id } = useParams() as { id: string }

  return (
    <MainLayout>
      <Header.SubPage title="Character Vote" />
      <QueryData
        refetchOnLoad
        showLoadingOnFetching
        queryRoute={$qc.vote.show[':characterId'].$get}
        queryArgs={{ params: { characterId: id } }}
        hookRequested={({ data }) => {
          stateSocial.set({
            id,
            data: {
              countCollect: data.countCollect,
              countComment: 0,
              countLike: 0,
              countShare: 0,
              isCollect: data.isCollectedForCurrentUser,
              isLike: false,
            },
          })
        }}
        renderData={({ data }) => (
          <Page data={data} />
        )}
      />
    </MainLayout>
  )
}
