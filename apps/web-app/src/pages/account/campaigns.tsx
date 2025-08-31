import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { CampaignList } from '@/components/campaign-list'
import { Empty } from '@/components/empty'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { Input } from '@/components/ui/input'
import { $qc } from '@/query-client'

export function PageAccountCampaigns() {
  const [inputValue, setInputValue] = useState<string>('')
  const [name] = useDebounce(inputValue, 1000)

  return (
    <MainLayout>
      <Header.SubPage title="My Campaigns" />
      <GuardAuthPage>
        <div className="p-4">
          <div className="w-full mb-4">
            <Input placeholder="Search" value={inputValue} onChange={e => setInputValue(e.target.value)} />
          </div>
          <QueryPageList
            refetchOnLoad
            queryRoute={$qc['character']['pageForMine'].$get}
            queryArgs={{
              query: { name },
            }}
            renderWrapper={<div className="grid grid-cols-2 gap-2 mt-4" />}
            renderItem={({ data }) => (
              <CampaignList key={data.id} data={data} />
            )}
            renderEmpty={<Empty.Icon message="No data" />}
          />
        </div>
      </GuardAuthPage>
    </MainLayout>
  )
}
