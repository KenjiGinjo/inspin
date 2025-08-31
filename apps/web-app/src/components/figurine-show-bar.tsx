import type { ResFigurineShow } from '@inspin/interfaces'
import { getRemainingTime } from '@inspin/tools/both'
import { useSelector } from '@legendapp/state/react'
import { isAfter } from 'date-fns'
import React from 'react'
import { navigate } from 'wouter/use-browser-location'
import { config } from '@/config'
import { stateUser } from '@/states'
import { FigurineBuyDrawer } from './figurine-buy-drawer'
import { FigurineRaffleSelectDrawer } from './figurine-raffle-select-drawer'
import { FixBottomBar } from './fix-bottom-bar'
import { Button } from './ui/button'

function LoginButton() {
  return (
    <Button
      onClick={() => {
        navigate(config.loginPagePath.get())
      }}
      className="w-full"
    >
      Log In to Buy
    </Button>
  )
}

const innerClassName = 'flex-col p-4'

function PreSale({ data }: { data: ResFigurineShow }) {
  const $stateUser = useSelector(() => stateUser.getData())
  const { days, hours } = getRemainingTime(new Date(data.sale.preSaleEndAt))
  const [remainingStr, setRemainingStr] = React.useState(`${days} days and ${hours} hours`)
  const discount = ((Number(data.sale.salePrice) - Number(data.sale.preSalePrice)) / Number(data.sale.salePrice) * 100).toFixed(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      const { days, hours } = getRemainingTime(new Date(data.sale.preSaleEndAt))
      setRemainingStr(`${days} days and ${hours} hours`)
    }, 1000)
    return () => clearInterval(interval)
  }, [data.sale.preSaleEndAt])

  return (
    <FixBottomBar innerClassName={innerClassName}>
      <div className="text-xs text-gray-400 -mt-2 mb-2 font-bold text-left w-full">
        {`Time Remaining: ${remainingStr}`}
      </div>

      {$stateUser
        ? <FigurineBuyDrawer data={data} buttonText={`Buy Now: ${discount}% Off Pre-Sale Discount`} />
        : (
            <LoginButton />
          )}
    </FixBottomBar>
  )
}

function Normal({ data }: { data: ResFigurineShow }) {
  const $stateUser = useSelector(() => stateUser.getData())

  return (
    <FixBottomBar innerClassName={innerClassName}>
      {$stateUser
        ? (
            <div className="flex w-full justify-between">
              <FigurineRaffleSelectDrawer data={data} />
              <FigurineBuyDrawer data={data} buttonText="Buy Now" buttonClassName="w-14/24 rounded-full" />
            </div>
          )
        : (
            <LoginButton />
          )}
    </FixBottomBar>
  )
}

export function FigurineShowBar({ data }: { data: ResFigurineShow }) {
  const isPreSale = isAfter(data.sale.preSaleEndAt, new Date())

  if (isPreSale) {
    return <PreSale data={data} />
  }

  return <Normal data={data} />
}
