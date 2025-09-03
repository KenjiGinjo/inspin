import { useSelector } from '@legendapp/state/react'
import { navigate } from 'wouter/use-browser-location'
import { signout } from '@/components/auth/signin'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Request } from '@/components/request'
import { Tabbar } from '@/components/tabbar'
import { UserCard } from '@/components/user-card'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'

function Page() {
  const $stateUser = useSelector(() => stateUser.getData())

  if (!$stateUser) {
    return null
  }

  return (
    <div className="p-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <UserCard.AvatarAndNickname
          data={{
            id: $stateUser.id,
            profile: {
              nickname: $stateUser.profile.nickname,
              avatar: $stateUser.profile.avatar,
            },
          }}
          size="lg"
          onClick={() => {
            navigate('/account/profile')
          }}
        />
      </div>

      <div className="mt-4 px-4">
        <UserCard.Cell onClick={() => {
          navigate('/account/settings')
        }}
        >
          Account Settings
        </UserCard.Cell>

        <Request
          request={() => $qc.authentication.logout.$put.mutation()}
          showLoading
          showModal
          showModalOption={{
            description: 'Are you sure you want to logout?',
          }}
          onSuccess={() => {
            signout()
            navigate('/auth/login', { replace: true })
          }}
        >
          <UserCard.Cell>Logout</UserCard.Cell>
        </Request>
      </div>
    </div>
  )
}

export function PageUser() {
  return (
    <MainLayout className="bg-gray-50">
      <Header.MainPage />
      <GuardAuthPage>
        <Page />
      </GuardAuthPage>
      <Tabbar />
    </MainLayout>
  )
}
