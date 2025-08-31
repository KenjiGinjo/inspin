import { GENRE_OPTIONS, ORDER_BY_OPTIONS } from '@inspin/constants'
import { EnumCharacterCrowdfundingStatus } from '@inspin/enums'
import { IconArrowRightSLine } from '@inspin/svg'
import { useState } from 'react'
import { navigate } from 'wouter/use-browser-location'
import { CrowdfundingList } from '@/components/crowdfunding-list'
import { Empty } from '@/components/empty'
import { FigurineList } from '@/components/figurine-list'
import { Header } from '@/components/header'
import { HomeBanner } from '@/components/home-banner'
import { MainLayout } from '@/components/layout'
import { QueryList } from '@/components/query-list'
import { ScrollTags } from '@/components/scroll-tags'
import { Tabbar } from '@/components/tabbar'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { VoteList } from '@/components/vote-list'
import { $qc } from '@/query-client'

function VoteSection() {
  const [orderBy, setOrderBy] = useState<'latest' | 'mostView'>('latest')
  const [genre, setGenre] = useState<string | undefined>(undefined)

  return (
    <>
      <div className="text-xl mt-8 mb-4 font-bold text-gray-700 px-4">Voting Campaigns</div>
      <div className="flex items-center justify-start px-4 gap-2">
        <ScrollTags
          tags={ORDER_BY_OPTIONS.map(option => option.label)}
          onSelect={e => setOrderBy(ORDER_BY_OPTIONS.find(option => option.label === e)?.value as 'latest' | 'mostView')}
          className="shrink-0"
        />
        <Divider orientation="vertical" className="h-6" />
        <ScrollTags
          tags={GENRE_OPTIONS.map(option => option.label)}
          onSelect={e => setGenre(GENRE_OPTIONS.find(option => option.label === e)?.value as string)}
        />
      </div>

      <QueryList
        refetchOnLoad
        queryRoute={$qc['vote']['page-list'].$get}
        queryArgs={{
          query: {
            orderBy,
            genre,
          },
        }}
        renderWrapper={<div className="grid grid-cols-2 gap-2 p-4" />}
        renderItem={({ data }) => (
          <VoteList key={data.id} data={data} />
        )}
        renderEmpty={<Empty.Icon message="No data" />}
      />
      <div className="px-4">
        <Button
          variant="outline"
          className="w-full rounded-full"
          onClick={() => {
            navigate('/vote/list')
          }}
        >
          Discover More Voting
        </Button>
      </div>

    </>
  )
}

function FigurineSection() {
  return (
    <>
      <div
        className="mt-8  p-4 pb-0 flex items-center justify-between"
        onClick={() => {
          navigate('/figurines/list?orderBy=mostView')
        }}
      >
        <div className="text-gray-700 font-bold text-xl">Popular Figurines On Sale</div>
        <IconArrowRightSLine className="size-4 text-gray-500" />
      </div>

      <QueryList
        refetchOnLoad
        queryRoute={$qc['figurine']['page-list'].$get}
        queryArgs={{
          query: {
            orderBy: 'mostView',
          },
        }}
        renderWrapper={<div className="flex gap-2 overflow-x-scroll p-4" style={{ scrollbarWidth: 'none' }} />}
        renderItem={({ data }) => (
          <div key={data.id} className="shrink-0 w-[240px]">
            <FigurineList data={data} />
          </div>
        )}
        renderEmpty={<Empty.Icon message="No data" />}
      />

    </>
  )
}

function CrowdfundingSection() {
  const [orderBy, setOrderBy] = useState<'latest' | 'mostView'>('latest')
  const [genre, setGenre] = useState<string | undefined>(undefined)

  return (
    <>
      <div className="text-xl mt-8 mb-4 font-bold text-gray-700 px-4">Crowdfunding Campaigns</div>
      <div className="flex items-center justify-start px-4 gap-2">
        <ScrollTags
          tags={ORDER_BY_OPTIONS.map(option => option.label)}
          onSelect={e => setOrderBy(ORDER_BY_OPTIONS.find(option => option.label === e)?.value as 'latest' | 'mostView')}
          className="shrink-0"
        />
        <Divider orientation="vertical" className="h-6" />
        <ScrollTags
          tags={GENRE_OPTIONS.map(option => option.label)}
          onSelect={e => setGenre(GENRE_OPTIONS.find(option => option.label === e)?.value as string)}
        />
      </div>

      <QueryList
        refetchOnLoad
        queryRoute={$qc['crowdfunding']['page-list'].$get}
        queryArgs={{
          query: {
            orderBy,
            genre,
            status: EnumCharacterCrowdfundingStatus.Active,
          },
        }}
        renderWrapper={<div className="grid grid-cols-2 gap-2 p-4" />}
        renderItem={({ data }) => (
          <CrowdfundingList key={data.id} data={data} />
        )}
        renderEmpty={<Empty.Icon message="No data" />}
      />
      <div className="px-4">
        <Button
          variant="outline"
          className="w-full rounded-full"
          onClick={() => {
            navigate('/crowdfunding/list')
          }}
        >
          Discover More Crowdfunding
        </Button>
      </div>

    </>
  )
}

export function PageHome() {
  return (
    <MainLayout>
      <Header.MainPage color="pink" />
      <HomeBanner />
      <VoteSection />
      <FigurineSection />
      <CrowdfundingSection />
      <Tabbar />
    </MainLayout>
  )
}
