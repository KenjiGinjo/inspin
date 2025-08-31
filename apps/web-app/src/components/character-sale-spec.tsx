import type { ICharacterSaleOrderItem } from '@inspin/interfaces'
import { APP } from '@inspin/constants'
import { Image } from './ui/image'

function OrderItem({ item }: { item: ICharacterSaleOrderItem }) {
  return (
    <div className="flex items-center gap-4">
      <Image src={item.characterSaleSpecImage || ''} alt={item.characterSaleSpecTitle} className="size-18 rounded shrink-0" />
      <div className="text-gray-500 text-xs">
        <div className="font-bold text-gray-700">{`${item.characterSaleSpecTitle} - ${item.characterName}`}</div>
        <div>{`Quantity: ${item.quantity}`}</div>
        <div>{`Price: ${APP.currencySymbol}${item.price}`}</div>
        <div>
          {`Item total: ${APP.currencySymbol}${item.price * item.quantity}`}
        </div>
      </div>
    </div>
  )
}

export const CharacterSaleSpec = {
  OrderItem,
}
