import type { ResVoteShow } from '@inspin/interfaces'
import { EnumCharacterStatus } from '@inspin/enums'
import { IconQuestionLine } from '@inspin/svg'
import { useSelector } from '@legendapp/state/react'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { navigate } from 'wouter/use-browser-location'
import { config } from '@/config'
import { useUserState } from '@/hooks/user'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'
import { showModal } from './extend'
import { FixBottomBar } from './fix-bottom-bar'
import { Request } from './request'
import { Button } from './ui/button'
import { Progress } from './ui/progress'

const innerClassName = 'flex-col p-4'

function Pending({ data }: { data: ResVoteShow }) {
  return (
    <FixBottomBar className="bg-gray-100" innerClassName={innerClassName}>
      <div className="">
        <b>Your Submission is Under Review </b>
        Thank you for submitting your project! Your submission is currently under review by our team. Once approved, your project will be automatically published for voting. We will notify you as soon as the review process is complete.
      </div>
      <div className="flex gap-2 w-full py-4">
        <Button
          variant="outline"
          className="bg-gray-100 px-8 rounded-full"
          onClick={() => {
            navigate(`/character/edit/${data.id}`, { replace: true })
          }}
        >
          Edit
        </Button>
        <Request
          request={() => $qc.character[':characterId'].$delete.mutation({
            params: {
              characterId: data.id,
            },
          })}
          showModal={true}
          showModalOption={{ description: 'Are you sure you want to delete this character?' }}
          onSuccess={() => {
            navigate('/account/campaigns', { replace: true })
          }}
        >
          <Button variant="destructive" className="px-8 rounded-full">Delete</Button>
        </Request>
      </div>
    </FixBottomBar>
  )
}

function VoteProgressBar({ current, target }: { current: number, target: number }) {
  const value = (current / target) * 100
  return (
    <div className="w-full">
      <Progress value={value} color="#7BF1A8" />
      <div className="flex justify-between text-xs text-gray-400">
        <div>
          Voting Progress
        </div>
        <div>
          <span>{current}</span>
          <span className="mx-1">/</span>
          <span>{target}</span>
        </div>
      </div>
    </div>
  )
}

function Voting({ data }: { data: ResVoteShow }) {
  const $stateUser = useSelector(() => stateUser.getData())
  const hasNoVotes = $stateUser === null || $stateUser.voteToken <= 0
  const qc = useQueryClient()
  const { refetch } = useUserState()

  if ($stateUser === null) {
    return (
      <FixBottomBar innerClassName={innerClassName}>
        <VoteProgressBar current={data.vote.countCurrent} target={data.vote.countTarget} />
        <Button
          className="w-full mt-4"
          onClick={() => {
            navigate(config.loginPagePath.get())
          }}
        >
          Log In to Vote
        </Button>
      </FixBottomBar>
    )
  }

  return (

    <FixBottomBar innerClassName={innerClassName}>
      <VoteProgressBar current={data.vote.countCurrent} target={data.vote.countTarget} />
      {hasNoVotes
        ? (
            <div className="text-center text-sm text-gray-500 border w-full border-dashed p-2 rounded-md mt-4">
              You have no votes left. You'll receive 3 votes each day.
            </div>
          )

        : (
            <Request
              authGuard
              request={() => $qc.vote[':characterId'].$post.mutation({
                params: {
                  characterId: data.id,
                },
              })}
              showLoading
              showModal={true}
              showModalOption={{
                title: 'Confirm Your Vote',
                description: `Are you sure you want to vote for this character? You will use 1 vote. After voting, you will have ${`${$stateUser?.voteToken - 1}`} votes remaining.`,
              }}
              onSuccess={async () => {
                $qc.vote.show[':characterId'].$get.invalidateQueries(qc, {
                  params: {
                    characterId: data.id,
                  },
                })
                await refetch()
                navigate(`/contributors/${data.id}`)
              }}
            >
              <Button className="w-full mt-4">Vote to Support</Button>
            </Request>
          )}
    </FixBottomBar>
  )
}

function Negotiation({ data }: { data: ResVoteShow }) {
  return (

    <FixBottomBar innerClassName={innerClassName}>
      <VoteProgressBar current={data.vote.countCurrent} target={data.vote.countTarget} />
      <div
        className="text-left text-sm text-gray-500 border w-full border-dashed p-2 rounded-md mt-4"
        onClick={() => {
          showModal({
            title: 'Copyright Negotiations',
            description: 'We are currently in the process of negotiating copyright agreements to ensure that we can bring your favorite characters to life as collectible figurines. This process involves discussions with creators and rights holders. Thank you for your patience and support.',
            showCancel: false,
            confirmText: 'Got it',
          })
        }}
      >
        <span className="underline">Copyright negotiations are currently in progress. Please check back later for updates. </span>
        <span className="inline-block ml-2"><IconQuestionLine className="size-4" /></span>
      </div>
    </FixBottomBar>
  )
}

export function VoteShowBar({ data }: { data: ResVoteShow }) {
  const $stateUser = useSelector(() => stateUser.getData())
  const isPending = data.status === EnumCharacterStatus.Pending
  const isRejected = data.status === EnumCharacterStatus.Rejected

  const isNegotiation = data.status === EnumCharacterStatus.Approved && data.vote.countCurrent >= data.vote.countTarget

  if (isPending || isRejected) {
    // TODO: 后面可以在做一个 拒绝
    if ($stateUser?.id === data.user.id) {
      return <Pending data={data} />
    }
    else {
      return null
    }
  }

  if (isNegotiation) {
    return <Negotiation data={data} />
  }

  return <Voting data={data} />
}
