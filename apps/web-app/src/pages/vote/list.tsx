import { GENRE_OPTIONS, ORDER_BY_OPTIONS } from '@inspin/constants'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Empty } from '@/components/empty'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { ScrollTags } from '@/components/scroll-tags'
import { Input } from '@/components/ui/input'
import { VoteList } from '@/components/vote-list'
import { $qc } from '@/query-client'

export function PageVoteList() {
  const [orderBy, setOrderBy] = useState<'latest' | 'mostView'>('latest')
  const [genre, setGenre] = useState<string | undefined>(undefined)
  const [inputValue, setInputValue] = useState<string>('')
  const [name] = useDebounce(inputValue, 1000)

  return (
    <MainLayout className="bg-gray-50">
      <Header.SubPage title="Voting Campaigns" />
      <div className=" p-4">

        <div className=" w-full mb-4">
          <Input placeholder="Search" value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </div>
        <ScrollTags
          tags={ORDER_BY_OPTIONS.map(option => option.label)}
          onSelect={e => setOrderBy(ORDER_BY_OPTIONS.find(option => option.label === e)?.value as 'latest' | 'mostView')}
          className="mb-2"
        />
        <ScrollTags
          tags={GENRE_OPTIONS.map(option => option.label)}
          onSelect={e => setGenre(GENRE_OPTIONS.find(option => option.label === e)?.value as string)}
        />
        <QueryPageList
          refetchOnLoad
          queryRoute={$qc['vote']['page-list'].$get}
          queryArgs={{
            query: {
              orderBy,
              genre,
              name,
            },
          }}
          renderWrapper={<div className="grid grid-cols-2 gap-2 mt-4" />}
          renderItem={({ data }) => (
            <VoteList key={data.id} data={data} />
          )}
          renderEmpty={<Empty.Icon message="No data" />}
        />
      </div>

    </MainLayout>
  )
}
