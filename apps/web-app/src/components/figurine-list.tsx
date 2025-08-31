import type { ResFigurineList } from '@inspin/interfaces'
import { navigate } from 'wouter/use-browser-location'
import { Price } from './price'
import { Image } from './ui/image'

export function FigurineList({ data }: {
  data: ResFigurineList
}) {
  const isPreSale = new Date(data.sale.preSaleEndAt) > new Date()

  return (
    <div
      className="w-full rounded overflow-hidden border border-gray-200 border-solid shrink-0"
      onClick={() => {
        navigate(`/figurines/show/${data.id}`)
      }}
    >
      <Image src={data.sale.images?.[0] || ''} alt={data.name} className="w-full h-[250px] object-cover" />
      <div className="w-full p-2">
        <div className="text-gray-700 font-bold h-10 leading-tight line-clamp-2">
          {data.name}
        </div>
        <div className="text-gray-500 text-sm">{`${data.sale.preSaleCount + data.sale.saleCount} bought in past`}</div>
        {isPreSale
          ? <Price size="sm" price={data.sale.salePrice} discountPrice={data.sale.preSalePrice} />
          : <Price size="sm" price={data.sale.salePrice} />}
      </div>
    </div>
  )
}
