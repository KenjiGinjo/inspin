import { IconTicketFill } from '@inspin/svg'
import { useSelector } from '@legendapp/state/react'
import { navigate } from 'wouter/use-browser-location'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Tabbar } from '@/components/tabbar'
import { UserCard } from '@/components/user-card'
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
        <div className="flex items-center justify-between mt-4">
          <UserCard.AssetItem
            icon={<IconTicketFill />}
            title="已完成的"
            value={0}
            className="text-pink-500"
          />
          <UserCard.AssetItem
            icon={<IconTicketFill />}
            title="已完成的"
            value={0}
            className="text-pink-500"
          />
        </div>
      </div>

      <div className="mt-4 px-4">
        <UserCard.Cell onClick={() => {
          navigate('/account/settings')
        }}
        >
          Account Settings
        </UserCard.Cell>
        <UserCard.Cell>Logout</UserCard.Cell>
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
