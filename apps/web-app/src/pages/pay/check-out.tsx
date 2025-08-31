import { EnumPayIntentType, EnumUserAddressPageFrom } from '@inspin/enums'
import { useParams } from 'wouter'
import { CharacterSaleOrderButton } from '@/components/character-sale-order-button'
import { CharacterSaleOrderContent } from '@/components/character-sale-order-content'
import { CrowdfundingSupportButton } from '@/components/crowdfunding-support-button'
import { CrowdfundingSupportContent } from '@/components/crowdfunding-support-content'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { UserAddressCardSelector } from '@/components/user-address-card-selector'
import { $qc } from '@/query-client'

function getPaymentIntentTitle(type: EnumPayIntentType) {
  switch (type) {
    case EnumPayIntentType.CrowdfundingSupport:
      return 'Crowdfunding Support'
    case EnumPayIntentType.Figurine:
      return 'Figurine Purchase'
    default:
      return 'Check Out'
  }
}

function FigurineCheckOut({ id }: { id: string }) {
  return (
    <QueryData
      showLoadingOnFetching
      refetchOnLoad
      queryRoute={$qc['character-sale-order'].show[':characterSaleOrderId'].$get}
      queryArgs={{ params: { characterSaleOrderId: id } }}
      renderData={({ data }) => (
        <>
          <UserAddressCardSelector
            orderId={id}
            userAddressId={data.address?.id}
            from={EnumUserAddressPageFrom.Checkout}
          />
          <CharacterSaleOrderContent data={data} />
          <CharacterSaleOrderButton data={data} />
        </>
      )}
    />
  )
}

function CrowdfundingSupportCheckOut({ id }: { id: string }) {
  return (
    <QueryData
      showLoadingOnFetching
      refetchOnLoad
      queryRoute={$qc['crowdfunding-support'].show[':supportId'].$get}
      queryArgs={{ params: { supportId: id } }}
      renderData={({ data }) => (
        <>
          <CrowdfundingSupportContent data={data} />
          <CrowdfundingSupportButton data={data} />
        </>
      )}
    />
  )
}

export function PageCheckOut() {
  const { id, type } = useParams() as { id: string, type: EnumPayIntentType }

  return (
    <MainLayout>
      <Header.SubPage title={getPaymentIntentTitle(type)} />
      <div className="p-4">
        {type === EnumPayIntentType.Figurine && <FigurineCheckOut id={id} />}
        {type === EnumPayIntentType.CrowdfundingSupport && <CrowdfundingSupportCheckOut id={id} />}
      </div>
    </MainLayout>
  )
}
