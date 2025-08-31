import { cn } from '@/lib/utils'

export function MainLayout({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn('min-h-screen w-full bg-white', className)}>
      {children}
    </div>
  )
}
