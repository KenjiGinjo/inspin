import { APP } from '@inspin/constants'
import { Progress } from './ui/progress'

export function CrowdfundingProgressBar({ current, target }: { current: number, target: number }) {
  const value = (current / target) * 100
  return (
    <div className="w-full">
      <Progress value={value} color="#00C950" />
      <div className="flex justify-between text-xs text-gray-400">
        <div>
          Crowdfunding Progress
        </div>
        <div>
          <span>{APP.currencySymbol}</span>
          <span>{current}</span>
          <span className="mx-1">/</span>
          <span>{APP.currencySymbol}</span>
          <span>{target}</span>
        </div>
      </div>
    </div>
  )
}
