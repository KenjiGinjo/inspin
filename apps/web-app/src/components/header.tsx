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
          'w-full fixed top-0 left-0 right-0 z-50',
          'backdrop-blur-md bg-background/80 border-b border-border/50',
          'transition-all duration-300',
          color === 'pink'
            ? 'bg-gradient-to-r from-pink-500/90 to-pink-600/90 text-white shadow-lg'
            : 'bg-background/95 text-foreground shadow-sm',
        )}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="w-full h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className={cn(
              'text-xl sm:text-2xl font-bold transition-all duration-200',
              'hover:scale-105 active:scale-95',
              color === 'pink' ? 'text-white' : 'text-foreground',
            )}
          >
            {APP.appName}
          </Link>
        </div>
      </div>
      <div className="w-full h-14 sm:h-16" style={{ paddingTop: 'env(safe-area-inset-top)' }} />
    </>
  )
}

function SubPage({ title, rightChild }: { title?: string, rightChild?: React.ReactNode }) {
  return (
    <>
      <div
        className="w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/95 border-b border-border/50 shadow-sm transition-all duration-300"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="w-full h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 relative">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navBack()}
              className="p-2 rounded-lg hover:bg-accent transition-colors duration-200 active:scale-95"
            >
              <IconArrowLeftSLine className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </div>
          {title && (
            <div className="absolute left-1/2 -translate-x-1/2 text-center text-foreground font-semibold text-lg sm:text-xl w-[60%] truncate">
              {title}
            </div>
          )}
          {rightChild && (
            <div className="flex items-center">
              {rightChild}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-14 sm:h-16" style={{ paddingTop: 'env(safe-area-inset-top)' }} />
    </>
  )
}

export const Header = {
  MainPage,
  SubPage,
}
