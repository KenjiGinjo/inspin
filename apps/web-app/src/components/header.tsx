import { APP } from '@inspin/constants'
import { IconArrowLeftSLine } from '@inspin/svg'
import { Link } from 'wouter'
import { navBack } from '@/lib/navback'
import { cn } from '@/lib/utils'

function MainPage({ color }: { color?: 'pink' }) {
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
          <Link to="/" className="text-2xl font-bold">
            {APP.appName}
          </Link>
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
