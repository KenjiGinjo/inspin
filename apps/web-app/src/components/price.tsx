import { APP } from '@inspin/constants'
import { cn } from '@/lib/utils'

function splitPrice(price: string) {
  const priceStr = price.split('.')
  const integerPart = priceStr[0]
  const decimalPart = priceStr[1]

  return {
    integerPart,
    decimalPart,
  }
}

interface PriceProps {
  price: number
  discountPrice?: number
  className?: string
  size?: 'default' | 'sm'
}

export function Price({ price, discountPrice, className, size = 'default' }: PriceProps) {
  const priceStr = price.toFixed(2)
  const discountPriceStr = discountPrice?.toFixed(2) || ''
  const isSmall = size === 'sm'

  if (discountPrice) {
    const { integerPart, decimalPart } = splitPrice(discountPriceStr)

    return (
      <div className={cn('text-gray-700', className)}>
        <span className={cn('pr-1', isSmall ? 'text-base' : 'text-xl')}>{APP.currencySymbol}</span>
        <span className={cn('font-bold', isSmall ? 'text-2xl' : 'text-3xl')}>{integerPart}</span>
        <span className={isSmall ? 'text-base' : 'text-xl'}>
          {`.${decimalPart}`}
        </span>
        <span className={cn('line-through text-gray-400 ml-2', isSmall ? 'text-sm' : 'text-base')}>{`${APP.currencySymbol}${price}`}</span>
      </div>
    )
  }

  const { integerPart, decimalPart } = splitPrice(priceStr)

  return (
    <div className={cn('text-gray-700', className)}>
      <span className={cn('pr-1', isSmall ? 'text-base' : 'text-xl')}>{APP.currencySymbol}</span>
      <span className={cn('font-bold', isSmall ? 'text-2xl' : 'text-3xl')}>{integerPart}</span>
      <span className={isSmall ? 'text-base' : 'text-xl'}>
        {`.${decimalPart}`}
      </span>
    </div>
  )
}
