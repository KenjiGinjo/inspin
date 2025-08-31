import { GENRE_OPTIONS } from '@inspin/constants'
import { IconArrowRightSLine } from '@inspin/svg'
import { navigate } from 'wouter/use-browser-location'
import { Empty } from '@/components/empty'
import { FigurineBanner } from '@/components/figurine-banner'
import { FigurineList } from '@/components/figurine-list'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryList } from '@/components/query-list'
import { ScrollTags } from '@/components/scroll-tags'
import { Tabbar } from '@/components/tabbar'
import { $qc } from '@/query-client'

function FigurineSection() {
  return (
    <>
      <div
        className="mt-8  p-4 pb-0 flex items-center justify-between"
        onClick={() => {
          navigate('/figurines/list?orderBy=latest')
        }}
      >
        <div className="text-gray-700 font-bold text-xl">Latest Figurines</div>
        <IconArrowRightSLine className="size-4 text-gray-500" />
      </div>

      <QueryList
        refetchOnLoad
        queryRoute={$qc['figurine']['page-list'].$get}
        queryArgs={{
          query: {
            orderBy: 'latest',
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
      <div
        className="mt-8  p-4 pb-0 flex items-center justify-between"
        onClick={() => {
          navigate('/figurines/list?orderBy=mostView')
        }}
      >
        <div className="text-gray-700 font-bold text-xl">Popular Figurines</div>
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

export function PageFigurines() {
  return (
    <MainLayout>
      <Header.MainPage />
      <FigurineBanner />
      <div className="my-4  p-4 pb-0">
        <div className="text-gray-700 font-bold text-xl">Search By</div>
        <ScrollTags
          tags={GENRE_OPTIONS.map(option => option.label)}
          onSelect={(e) => {
            navigate(`/figurines/list?genre=${GENRE_OPTIONS.find(option => option.label === e)?.value}`)
          }}
          className="mt-4"
        />
      </div>
      <FigurineSection />
      <Tabbar />
    </MainLayout>
  )
}
