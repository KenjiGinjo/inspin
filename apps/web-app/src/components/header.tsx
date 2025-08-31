import { IconAddLargeLine, IconArrowLeftSLine, IconLoginBoxLine, IconLogoMini, IconSearchLine } from '@inspin/svg'
import { useSelector } from '@legendapp/state/react'
import { Link } from 'wouter'
import { config } from '@/config'
import { navBack } from '@/lib/navback'
import { cn } from '@/lib/utils'
import { stateUser } from '@/states'
import { Menu } from './menu'
import { Button } from './ui/button'

function MainPage({ color }: { color?: 'pink' }) {
  const $stateUser = useSelector(() => stateUser.getData())

  return (
    <>
      <div
        className={cn(
          'w-full h-12 fixed top-0 left-0 right-0 z-10',
          color === 'pink' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700',
        )}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="w-full h-full flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Menu color={color} />
            <Link to="/">
              <IconLogoMini className={cn(color === 'pink' ? 'text-white' : 'text-gray-700')} />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <IconSearchLine className="w-5 h-5" />
            {$stateUser
              ? (
                  <Link to="character/create">
                    <Button variant="secondary" className="rounded-full">
                      <IconAddLargeLine className="w-5 h-5" />
                      <span>Create a Vote</span>
                    </Button>
                  </Link>
                )
              : (
                  <Link to={config.loginPagePath.get()}>
                    <Button variant="secondary" className="rounded-full">
                      <IconLoginBoxLine className="w-5 h-5" />
                      <span>Login</span>
                    </Button>
                  </Link>
                )}
          </div>
        </div>
      </div>
      <div className="w-full h-12" style={{ paddingTop: 'env(safe-area-inset-top)' }} />
    </>
  )
}

function SubPage({ title, rightChild }: { title?: string, rightChild?: React.ReactNode }) {
  return (
    <>
      <div
        className="w-full h-12 fixed top-0 left-0 right-0 z-10 bg-white shadow"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="w-full h-full flex items-center justify-between p-2 relative">
          <div className="flex items-center gap-2">
            <div onClick={() => navBack()}>
              <IconArrowLeftSLine className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          {title && <div className="absolute left-1/2 -translate-x-1/2 text-center text-gray-700 font-bold w-[65%]">{title}</div>}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {rightChild}
        </div>
      </div>
      <div className="w-full h-12" style={{ paddingTop: 'env(safe-area-inset-top)' }} />
    </>
  )
}

export const Header = {
  MainPage,
  SubPage,
}
