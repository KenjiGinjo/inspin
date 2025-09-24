import { cn } from '@/lib/utils'

export function MainLayout({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(
      'min-h-screen w-full bg-background',
      'flex flex-col',
      'max-w-7xl mx-auto',
      'transition-colors duration-300',
      className
    )}>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}
