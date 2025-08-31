import { useEffect } from 'react'
import { auth } from '@/components/auth/state'
import { showModal } from '@/components/extend'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'

function Description() {
  return (
    <>
      <span className="block text-left">
        You have received
        {' '}
        <b>3 votes</b>
        {' '}
        for today! Use them to support your favorite characters.
      </span>
      <span className="block text-left mt-2">Remember, your votes help bring these creations to life. Happy voting!</span>
    </>
  )
}

export function useUserState(props?: { showDailyVotingReminder?: boolean }) {
  const { showDailyVotingReminder = false } = props || {}
  const { data, refetch } = $qc.user.state.$get.useQuery()
  const _data = data?.body.data

  useEffect(() => {
    if (_data) {
      stateUser.setData(_data)
      auth.setIsSignin(true)
      if (_data.isDistributedVoteToken && showDailyVotingReminder) {
        showModal({
          title: 'Daily Voting Reminder',
          description: <Description />,
          confirmText: 'Got It',
          showCancel: false,
        })
      }
    }
  }, [_data])

  return { refetch }
}

export function UserState() {
  useUserState({ showDailyVotingReminder: true })

  return null
}
