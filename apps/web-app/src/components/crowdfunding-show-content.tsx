import { Link } from 'wouter'
import { DescSec } from './ui/desc-sec'

export function CrowdfundingShowContent() {
  return (
    <div className="px-4">
      <div className="mb-8" />
      <DescSec
        title="Crowdfunding for Figurine Characters"
        desc="Welcome to Baikai, where your favorite illustrations come to life as collectible figurines! Support your favorite characters by contributing financially and bring them to reality."
      />
      <DescSec title="Rewards System">
        <p>Top 10 contributors in successful campaigns will receive Diamond rewards:</p>
        <div className="p-2 text-sm space-y-1">
          <p>1st place: 500 Diamonds</p>
          <p>2nd place: 400 Diamonds</p>
          <p>3rd place: 300 Diamonds</p>
          <p>4th-10th place: 200 Diamonds each</p>
        </div>
        <p className="mt-2">Earn Diamonds through contributions:</p>
        <div className="p-2 text-sm space-y-1">
          <p>$30 contribution: 10 Diamonds</p>
          <p>$50 contribution: 20 Diamonds</p>
          <p>$100 contribution: 50 Diamonds</p>
        </div>
      </DescSec>
      <DescSec title="Raffle System">
        <p>Use 160 Diamonds for a chance to win a figurine, instead of purchasing it directly with money in our online shop.</p>
        <p className="mt-2">Initial win probability is 0.06, with a guaranteed win on the 80th draw.</p>
        <Link to="/figurines" className="mt-4 block text-cyan-500 font-bold">~ Go and Explore Figurines Shop ~</Link>
      </DescSec>
      <DescSec title="How it Works">
        <p>Successful Campaigns: If the campaign reaches its goal, we will move into the production phase to create the figurine, and rewards will be distributed to top contributors.</p>
        <p className="mt-4">Unsuccessful Campaigns: If the campaign does not reach its goal within 60 days, all contributions will be refunded.</p>
      </DescSec>
    </div>
  )
}
