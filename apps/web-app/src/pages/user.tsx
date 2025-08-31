import { IconBankCardFill, IconBillFill, IconMapPinUserFill, IconNotificationFill, IconQuestionLine, IconShakeHandsFill, IconShoppingCartFill, IconStarFill, IconTicketFill, IconVipDiamondFill } from '@inspin/svg'
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
              nickname: $stateUser.profileNickname,
              avatar: $stateUser.profileAvatar,
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
            title="Vote Tickets"
            value={$stateUser.voteToken}
            className="text-pink-500"
          />
          <UserCard.AssetItem
            icon={<IconVipDiamondFill />}
            title="Available Diamonds"
            value={$stateUser.diamond}
            className="text-blue-500"
          />
          <UserCard.AssetItem
            icon={<IconQuestionLine />}
            title="Frozen Diamonds"
            value={$stateUser.diamond}
            className="text-gray-500"
          />
        </div>
      </div>

      <div className="mt-4 border-1 border-solid border-gray-200 rounded-lg px-4 py-6 flex items-center justify-around">
        <UserCard.MainEntryItem
          icon={<IconShakeHandsFill />}
          label="Campaigns"
          onClick={() => {
            navigate('/account/campaigns')
          }}
        />
        <UserCard.MainEntryItem
          icon={<IconNotificationFill />}
          label="Messages"
        />
        <UserCard.MainEntryItem
          icon={<IconBillFill />}
          label="Orders"
          onClick={() => {
            navigate('/order/list')
          }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <UserCard.SubEntryItem
          icon={<IconStarFill />}
          label="Collections"
        />
        <UserCard.SubEntryItem
          icon={<IconShoppingCartFill />}
          label="Shopping Cart"
        />
        <UserCard.SubEntryItem
          icon={<IconBankCardFill />}
          label="Payment Methods"
        />
        <UserCard.SubEntryItem
          icon={<IconMapPinUserFill />}
          label="Address Book"
          onClick={() => {
            navigate('/user-address/list')
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
        <UserCard.Cell>FAQ</UserCard.Cell>
        <UserCard.Cell>About Us</UserCard.Cell>
        <UserCard.Cell>Contract Support</UserCard.Cell>
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
