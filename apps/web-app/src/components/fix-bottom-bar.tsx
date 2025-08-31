import { cn } from '@/lib/utils'

interface FixBottomBarProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}
export function FixBottomBar({ children, className, innerClassName }: FixBottomBarProps) {
  return (
    <>
      <div
        className={cn('bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0', className)}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className={cn('flex items-center justify-around py-2', innerClassName)}>
          {children}
        </div>
      </div>
      <div style={{ paddingBottom: 'env(safe-area-inset-bottom)', visibility: 'hidden' }}>
        <div className="h-4"></div>
        <div className={cn('flex items-center justify-around py-2', innerClassName)}>
          {children}
        </div>
      </div>
    </>
  )
}
