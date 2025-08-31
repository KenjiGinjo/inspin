import { EnumCharacterCrowdfundingSupportStatus, EnumCharacterSaleOrderStatus } from '@inspin/enums'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { CrowdfundingOrderCard } from '@/components/crowdfunding-order-card'
import { Empty } from '@/components/empty'
import { FigurineOrderCard } from '@/components/figurine-order-card'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryList } from '@/components/query-list'
import { ScrollTags } from '@/components/scroll-tags'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { $qc } from '@/query-client'

// 手办订单状态选项
const FIGURINE_STATUS_OPTIONS = [
  { label: 'All', value: undefined },
  { label: 'Unpaid', value: EnumCharacterSaleOrderStatus.Unpaid },
  { label: 'Undelivered', value: EnumCharacterSaleOrderStatus.Undelivered },
  { label: 'Unreceived', value: EnumCharacterSaleOrderStatus.Unreceived },
  { label: 'Uncommented', value: EnumCharacterSaleOrderStatus.Uncommented },
  { label: 'Completed', value: EnumCharacterSaleOrderStatus.Completed },
  { label: 'Cancelled', value: EnumCharacterSaleOrderStatus.Cancelled },
  { label: 'Refunding', value: EnumCharacterSaleOrderStatus.Refunding },
  { label: 'Refunded', value: EnumCharacterSaleOrderStatus.Refunded },
]

// 众筹订单状态选项
const CROWDFUNDING_STATUS_OPTIONS = [
  { label: 'All', value: undefined },
  { label: 'Pending', value: EnumCharacterCrowdfundingSupportStatus.Pending },
  { label: 'Success', value: EnumCharacterCrowdfundingSupportStatus.Success },
  { label: 'Failed', value: EnumCharacterCrowdfundingSupportStatus.Failed },
  { label: 'Canceled', value: EnumCharacterCrowdfundingSupportStatus.Canceled },
]

export function PageOrderList() {
  const [activeTab, setActiveTab] = useState<'figurine' | 'crowdfunding'>('figurine')

  // 手办订单筛选状态
  const [figurineSearchKeyword, setFigurineSearchKeyword] = useState('')
  const [figurineStatus, setFigurineStatus] = useState<EnumCharacterSaleOrderStatus | undefined>(undefined)
  const [figurineSearchKeywordDebounced] = useDebounce(figurineSearchKeyword, 500)

  // 众筹订单筛选状态
  const [crowdfundingSearchKeyword, setCrowdfundingSearchKeyword] = useState('')
  const [crowdfundingStatus, setCrowdfundingStatus] = useState<EnumCharacterCrowdfundingSupportStatus | undefined>(undefined)
  const [crowdfundingSearchKeywordDebounced] = useDebounce(crowdfundingSearchKeyword, 500)

  return (
    <MainLayout>
      <Header.SubPage title="My Orders" />
      <div className="p-4 max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={value => setActiveTab(value as 'figurine' | 'crowdfunding')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="figurine">Figurine Orders</TabsTrigger>
            <TabsTrigger value="crowdfunding">Crowdfunding Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="figurine" className="space-y-4">
            {/* 手办订单筛选器 */}
            <div className="space-y-4">
              <Input
                placeholder="Search by order number..."
                value={figurineSearchKeyword}
                onChange={e => setFigurineSearchKeyword(e.target.value)}
                className="w-full"
              />
              <ScrollTags
                tags={FIGURINE_STATUS_OPTIONS.map(option => option.label)}
                onSelect={(label) => {
                  const option = FIGURINE_STATUS_OPTIONS.find(opt => opt.label === label)
                  setFigurineStatus(option?.value)
                }}
                className="flex-wrap"
              />
            </div>

            <QueryList
              refetchOnLoad
              queryRoute={$qc['order']['figurine']['list'].$get}
              queryArgs={{
                query: {
                  searchKeyword: figurineSearchKeywordDebounced || undefined,
                  status: figurineStatus,
                },
              }}
              renderItem={({ data }) => (
                <FigurineOrderCard key={data.id} data={data} />
              )}
              renderEmpty={<Empty.Icon message="No figurine orders yet" />}
            />
          </TabsContent>

          <TabsContent value="crowdfunding" className="space-y-4">
            {/* 众筹订单筛选器 */}
            <div className="space-y-4">
              <Input
                placeholder="Search by order number..."
                value={crowdfundingSearchKeyword}
                onChange={e => setCrowdfundingSearchKeyword(e.target.value)}
                className="w-full"
              />
              <ScrollTags
                tags={CROWDFUNDING_STATUS_OPTIONS.map(option => option.label)}
                onSelect={(label) => {
                  const option = CROWDFUNDING_STATUS_OPTIONS.find(opt => opt.label === label)
                  setCrowdfundingStatus(option?.value)
                }}
                className="flex-wrap"
              />
            </div>

            <QueryList
              refetchOnLoad
              queryRoute={$qc['order']['crowdfunding']['list'].$get}
              queryArgs={{
                query: {
                  searchKeyword: crowdfundingSearchKeywordDebounced || undefined,
                  status: crowdfundingStatus,
                },
              }}
              renderItem={({ data }) => (
                <CrowdfundingOrderCard key={data.id} data={data} />
              )}
              renderEmpty={<Empty.Icon message="No crowdfunding orders yet" />}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
