import { IconMenuLine } from '@inspin/svg'
import { useSelector } from '@legendapp/state/react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Link } from 'wouter'
import { cn } from '@/lib/utils'
import { stateUser } from '@/states'
import { Button } from './ui/button'
import { Divider } from './ui/divider'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { UserCard } from './user-card'

function Item({ label, href }: { label: string, href: string }) {
  return (
    <div className="text-gray-700">
      <Link href={href}>{label}</Link>
    </div>
  )
}
export function Menu({ color }: { color?: 'pink' }) {
  const $stateUser = useSelector(() => stateUser.getData())
  const isLoggedIn = !!$stateUser?.id

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconMenuLine
            className={cn('w-6 h-6', color === 'pink' ? 'text-white' : 'text-gray-700')}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>Baikai bring your favorite characters to life.</DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden>
        <div className="flex flex-col gap-2 p-4">
          {isLoggedIn && (
            <>
              <UserCard.AvatarAndNickname data={{
                id: $stateUser.id,
                profile: {
                  nickname: $stateUser.profileNickname,
                  avatar: $stateUser.profileAvatar,
                },
              }}
              />
              <Divider className="my-4" />
            </>
          )}
          <Item label="Home" href="/" />
          <Item label="Explore" href="/explore" />
          <Item label="Figurine Store" href="/figurines" />
          {isLoggedIn && (
            <>
              <Item label="Create a Vote" href="/character/create" />
            </>
          )}
          <Divider className="my-4" />
          <Item label="FAQ" href="/faq" />
          <Item label="Contact Us" href="/contact-support" />
          <Item label="About Us" href="/about-us" />
          <Divider className="my-4" />
          {!isLoggedIn && (
            <>
              <Item label="Login" href="/auth/login" />
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
