import type { ICharacterBase } from '@inspin/interfaces'
import { useSelector } from '@legendapp/state/react'
import { format } from 'date-fns'
import { stateSocial } from '@/states'
import { Analysis } from './analysis'
import { Badge } from './ui/badge'
import { DescSec } from './ui/desc-sec'
import { Divider } from './ui/divider'
import { UserCard } from './user-card'

export function VoteShowContentAnalysis({ data }: { data: ICharacterBase }) {
  const social = useSelector(() => stateSocial.get(data.id))

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Analysis.View count={data.countView} />
        <Divider orientation="vertical" className="h-4 mx-4" />
        <Analysis.Collection count={social.countCollect} />
      </div>
      <div className="text-gray-400">
        {format(data.createdAt, 'MMM d, yyyy')}
      </div>
    </div>
  )
}

export function VoteShowContentInfo({ data }: { data: ICharacterBase }) {
  return (
    <>
      <div className="text-2xl font-bold text-gray-700">{data.name}</div>
      <div className="text-gray-400 mt-2">
        By:
        {data.creatorName}
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-6">
        {data.genre?.split(',').map(item => (
          <Badge variant="secondary" key={item} className="text-gray-400 text-xs">
            {item}
          </Badge>
        ))}
      </div>
      <div className="mt-8">
        {data.description && <DescSec title="Character Description" desc={data.description} />}
        {data.website && <DescSec title="Character’s Homepage" desc={data.website} isUrl />}
        {data.note && (
          <DescSec title="Words from the Submitter" desc={data.note}>
            <UserCard.AvatarAndNickname data={data.user} className="mb-4" />
          </DescSec>
        )}
      </div>

      <Divider className="mb-8" />
      <DescSec title="Why Vote?" desc="Help bring your favorite characters to life as collectible figurines by voting for them!" />
      <DescSec title="How it works?" desc="Browse submissions and vote for the ones you love. The most popular characters will become figurines through crowdfunding." />
      <DescSec title="Copyright Negotiations" desc="After reaching 100%, our platform will initiate copyright discussions with the character's creator. Successful negotiations will allow the character to move to the crowdfunding phase." />
      <DescSec title="Tips for Voting" desc="Look for clear and captivating illustrations. Check if there's a website for more details about the character to make an informed choice." />
    </>
  )
}
