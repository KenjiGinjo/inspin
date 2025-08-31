import type { ResCrowdfundingShow } from '@inspin/interfaces'
import { EnumCharacterCrowdfundingStatus } from '@inspin/enums'
import { IconQuestionLine } from '@inspin/svg'
import { getRemainingTime } from '@inspin/tools/both'
import { useSelector } from '@legendapp/state/react'
import React from 'react'
import { navigate } from 'wouter/use-browser-location'
import { config } from '@/config'
import { stateUser } from '@/states'
import { CrowdfundingProgressBar } from './crowdfunding-progress-bar'
import { CrowdfundingSupportDrawer } from './crowdfunding-support-drawer'
import { showModal } from './extend'
import { FixBottomBar } from './fix-bottom-bar'
import { Button } from './ui/button'

const innerClassName = 'flex-col p-4'

function Support({ data }: { data: ResCrowdfundingShow }) {
  const $stateUser = useSelector(() => stateUser.getData())
  const { days, hours } = getRemainingTime(new Date(data.crowdfunding.endAt))
  const [remainingStr, setRemainingStr] = React.useState(`${days} days and ${hours} hours`)

  React.useEffect(() => {
    const interval = setInterval(() => {
      const { days, hours } = getRemainingTime(new Date(data.crowdfunding.endAt))
      setRemainingStr(`${days} days and ${hours} hours`)
    }, 1000)
    return () => clearInterval(interval)
  }, [data.crowdfunding.endAt])

  return (
    <FixBottomBar innerClassName={innerClassName}>
      <div className="text-xs text-gray-400 -mt-2 mb-2 font-bold text-left w-full">
        {`Time Remaining: ${remainingStr}`}
      </div>
      <CrowdfundingProgressBar
        current={Number(data.crowdfunding.countCurrent)}
        target={Number(data.crowdfunding.countTarget)}
      />

      {$stateUser
        ? <CrowdfundingSupportDrawer data={data} />
        : (
            <Button
              onClick={() => {
                navigate(config.loginPagePath.get())
              }}
              className="w-full mt-4"
            >
              Log In to Support
            </Button>
          )}
    </FixBottomBar>
  )
}

function SuccessPending({ data }: { data: ResCrowdfundingShow }) {
  return (

    <FixBottomBar innerClassName={innerClassName}>
      <CrowdfundingProgressBar
        current={Number(data.crowdfunding.countCurrent)}
        target={Number(data.crowdfunding.countTarget)}
      />
      <div
        className="text-left text-sm text-gray-500 border w-full border-dashed p-2 rounded-md mt-4"
        onClick={() => {
          showModal({
            title: 'More Information',
            description: (
              <>
                <span className="block text-left">We’re excited to announce that the campaign for Raiden Shogun has reached its goal. Here’s what you can expect next:</span>
                <span className="block mt-2 text-left"> - We’re starting production immediately. Stay tuned for updates on progress and estimated delivery dates. </span>
                <span className="block mt-2 text-left"> - Once the figurine is completed, you can use your diamonds to enter a raffle or purchase the figurine directly. This is our way of thanking you for your support and helping you get closer to the characters you love.</span>
              </>
            ),
            showCancel: false,
            confirmText: 'Got it',
          })
        }}
      >
        <span className="underline">The crowdfunding campaign has been successfully funded. We’re starting production immediately.Please check back later for updates. </span>
        <span className="inline-block ml-2"><IconQuestionLine className="size-4" /></span>
      </div>
    </FixBottomBar>
  )
}

export function CrowdfundingShowBar({ data }: { data: ResCrowdfundingShow }) {
  const isSuccessPending = data.crowdfunding.status === EnumCharacterCrowdfundingStatus.SuccessPending
  if (isSuccessPending) {
    return <SuccessPending data={data} />
  }

  return <Support data={data} />
}
