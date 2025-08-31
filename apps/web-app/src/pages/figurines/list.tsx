import { GENRE_OPTIONS, ORDER_BY_OPTIONS } from '@inspin/constants'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useSearchParams } from 'wouter'
import { Empty } from '@/components/empty'
import { FigurineList } from '@/components/figurine-list'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { ScrollTags } from '@/components/scroll-tags'
import { Input } from '@/components/ui/input'
import { $qc } from '@/query-client'

export function PageFigurineList() {
  const [searchParams] = useSearchParams()
  const _defaultOrderBy = searchParams.get('orderBy') as 'mostView'
  const _defaultGenre = GENRE_OPTIONS.find(option => option.value === searchParams.get('genre'))?.label as any
  const [orderBy, setOrderBy] = useState<'latest' | 'mostView'>(_defaultOrderBy || 'latest')

  const [genre, setGenre] = useState<string | undefined>(_defaultGenre)
  const [inputValue, setInputValue] = useState<string>('')
  const [name] = useDebounce(inputValue, 1000)

  return (
    <MainLayout className="bg-gray-50">
      <Header.SubPage title="Figurines On Sale" />
      <div className="p-4">
        <div className="w-full mb-4">
          <Input placeholder="Search" value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </div>
        <ScrollTags
          defaultSelectedTag={ORDER_BY_OPTIONS.find(option => option.value === _defaultOrderBy)?.label as any}
          tags={ORDER_BY_OPTIONS.map(option => option.label)}
          onSelect={e => setOrderBy(ORDER_BY_OPTIONS.find(option => option.label === e)?.value as any)}
          className="mb-2"
        />
        <ScrollTags
          defaultSelectedTag={_defaultGenre}
          tags={GENRE_OPTIONS.map(option => option.label)}
          onSelect={e => setGenre(GENRE_OPTIONS.find(option => option.label === e)?.value as string)}
        />
        <QueryPageList
          refetchOnLoad
          queryRoute={$qc['figurine']['page-list'].$get}
          queryArgs={{
            query: {
              orderBy,
              genre,
              name,
            },
          }}
          renderWrapper={<div className="grid grid-cols-2 gap-2 mt-4" />}
          renderItem={({ data }) => (
            <FigurineList key={data.id} data={data} />
          )}
          renderEmpty={<Empty.Icon message="No data" />}
        />
      </div>

    </MainLayout>
  )
}
