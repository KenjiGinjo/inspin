import { APP } from '@inspin/constants'
import { cn } from '@/lib/utils'

function Icon({ text, className }: { text: string, className?: string }) {
  return (
    <div className={cn('w-full flex flex-col items-center justify-center py-5', className)}>
      <div className="text-7xl font-bold text-pink-500">{APP.appName}</div>
      <div className="text-sm font-bold mt-2.5 text-pink-500">{text}</div>
    </div>
  )
}

export const Slogan = {
  Icon,
}
