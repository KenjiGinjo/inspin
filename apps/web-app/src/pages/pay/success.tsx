import { EnumPayIntentType } from '@inspin/enums'
import { IconHome2Line, IconStarFill, IconStoreLine } from '@inspin/svg'
import { Link, useParams } from 'wouter'
import { CharacterSaleSpec } from '@/components/character-sale-spec'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Button } from '@/components/ui/button'
import { $qc } from '@/query-client'

function getPaymentSuccessMessage(type: EnumPayIntentType) {
  switch (type) {
    case EnumPayIntentType.CrowdfundingSupport:
      return 'Thank you for your support! Your contribution has been successfully processed and will help bring this character to life.'
    case EnumPayIntentType.Figurine:
      return 'Your order has been successfully placed! We will process your order and ship it to you as soon as possible.'
    default:
      return 'Your payment has been processed successfully!'
  }
}

export function PagePaySuccess() {
  const { id, type } = useParams() as { id: string, type: EnumPayIntentType }

  return (
    <MainLayout>
      <Header.SubPage title="Payment Success" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <IconStarFill className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Payment Successful!
        </h1>

        <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
          {getPaymentSuccessMessage(type)}
        </p>

        {type === EnumPayIntentType.Figurine && (
          <QueryData
            queryRoute={$qc['character-sale-order'].show[':characterSaleOrderId'].$get}
            queryArgs={{ params: { characterSaleOrderId: id } }}
            renderData={({ data }) => (
              <div className="bg-gray-50 rounded p-2 mb-8 w-full max-w-md space-y-4">
                {data.items.map((item, index) => <CharacterSaleSpec.OrderItem key={index} item={item} />)}
              </div>
            )}
          />
        )}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              <IconHome2Line className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/figurines" className="flex-1">
            <Button className="w-full">
              <IconStoreLine className="w-4 h-4 mr-2" />
              Browse More
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 max-w-md">
          <p>You will receive an email confirmation shortly.</p>
          <p className="mt-2">
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
