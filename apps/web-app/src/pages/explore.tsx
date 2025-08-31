import type { ResCrowdfundingList, ResExploreList } from '@inspin/interfaces'
import { GENRE_OPTIONS, ORDER_BY_OPTIONS } from '@inspin/constants'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { CrowdfundingList } from '@/components/crowdfunding-list'
import { Empty } from '@/components/empty'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { ScrollTags } from '@/components/scroll-tags'
import { Tabbar } from '@/components/tabbar'
import { Divider } from '@/components/ui/divider'
import { Input } from '@/components/ui/input'
import { VoteList } from '@/components/vote-list'
import { $qc } from '@/query-client'

function Item({ data }: { data: ResExploreList }) {
  if (data.crowdfunding) {
    return <CrowdfundingList data={data as ResCrowdfundingList} showTag />
  }
  return <VoteList data={data} showTag />
}

export function PageExplore() {
  const [inputValue, setInputValue] = useState<string>('')
  const [name] = useDebounce(inputValue, 1000)
  const [orderBy, setOrderBy] = useState<'latest' | 'mostView'>('latest')
  const [genre, setGenre] = useState<string | undefined>(undefined)

  return (
    <MainLayout>
      <Header.MainPage color="pink" />
      <div className="w-full p-2 bg-pink-500">
        <Input
          type="search"
          placeholder="Search..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="bg-white"
        />
      </div>

      <div className="p-4">
        <div className="font-bold mb-4 text-gray-700">
          Explore
          {genre ? `- ${genre}` : 'All'}
        </div>
        <ScrollTags
          tags={ORDER_BY_OPTIONS.map(option => option.label)}
          onSelect={e => setOrderBy(ORDER_BY_OPTIONS.find(option => option.label === e)?.value as 'latest' | 'mostView')}
          className="mb-2"
        />
        <Divider className="my-2" />
        <ScrollTags
          tags={GENRE_OPTIONS.map(option => option.label)}
          onSelect={e => setGenre(GENRE_OPTIONS.find(option => option.label === e)?.value as string)}
        />
        <Divider className="my-2" />
        <QueryPageList
          refetchOnLoad
          queryRoute={$qc['explore']['page-list'].$get}
          queryArgs={{
            query: {
              orderBy,
              genre,
              name,
            },
          }}
          renderWrapper={<div className="grid grid-cols-2 gap-2 mt-4" />}
          renderItem={({ data }) => (
            <Item key={data.id} data={data} />
          )}
          renderEmpty={<Empty.Icon message="No data" />}
        />
      </div>

      <Tabbar />
    </MainLayout>
  )
}
