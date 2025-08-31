import type { ResRaffleShow } from '@inspin/interfaces'
import { DescSec } from './ui/desc-sec'
import { Divider } from './ui/divider'

export function RaffleShowContent({ data }: { data: ResRaffleShow }) {
  return (
    <>
      <Divider className="my-8" />
      <DescSec title="Winning Probability" desc={`Each raffle entry has a ${data.raffle.winRate} chance of winning.`} />
      <DescSec title="Guaranteed Win" desc={`You are guaranteed to receive a figurine after a maximum of ${data.raffle.guaranteeCount} entries. Once you win, your guaranteed entry count will reset to zero.`} />
      <DescSec title="Shared Accumulation">
        <p className="mb-1 text-pink-500 font-bold">
          {`${data.raffle.title} Pool`}
        </p>
        <p>
          All raffle entries in this pool (
          {data.raffle.title}
          ) contribute to a shared accumulation, ensuring everyone benefits from guaranteed rewards.
        </p>
      </DescSec>
      <DescSec title="Earn Diamonds">
        <p className="mb-2">Boost your diamond count through various engaging activities:</p>
        <p className="mb-2">
          Initiate a Vote: Successfully bring a figurine project to the crowdfunding stage and earn 500 diamonds as a reward.
        </p>
        <p>
          Participate in Voting: Be among the top 10 contributors in voting to receive diamond rewards ranging from 50 to 20 diamonds.
        </p>
        <div className="p-2 text-sm space-y-1">
          <p>1st place: 50 diamonds</p>
          <p>2nd place: 40 diamonds</p>
          <p>3rd place: 30 diamonds</p>
          <p>4th-10th place: 20 diamonds each</p>
        </div>
        <p className="mt-2">Top Contributors in Successful Campaigns:</p>
        <div className="p-2 text-sm space-y-1">
          <p>1st place: 500 diamonds</p>
          <p>2nd place: 400 diamonds</p>
          <p>3rd place: 300 diamonds</p>
          <p>4th-10th place: 200 diamonds each</p>
        </div>
        <p className="mt-2">Contribute to Crowdfunding:</p>
        <div className="p-2 text-sm space-y-1">
          <p>$30 contribution: Earn 10 diamonds</p>
          <p>$50 contribution: Earn 20 diamonds</p>
          <p>$100 contribution: Earn 50 diamonds</p>
        </div>
      </DescSec>
    </>

  )
}
