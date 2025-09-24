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
        className={cn(
          'bg-background/95 backdrop-blur-md border-t border-border/50',
          'fixed bottom-0 left-0 right-0 z-40',
          'shadow-lg',
          className
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className={cn('flex items-center justify-around py-4 px-4', innerClassName)}>
          {children}
        </div>
      </div>
      <div style={{ paddingBottom: 'env(safe-area-inset-bottom)', visibility: 'hidden' }}>
        <div className="h-4"></div>
        <div className={cn('flex items-center justify-around py-4 px-4', innerClassName)}>
          {children}
        </div>
      </div>
    </>
  )
}
