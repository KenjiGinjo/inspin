import { IconLogo } from '@inspin/svg'
import { cn } from '@/lib/utils'

function Icon({ text, className }: { text: string, className?: string }) {
  return (
    <div className={cn('w-full flex flex-col items-center justify-center py-5', className)}>
      <IconLogo />
      <div className="text-sm font-bold mt-2.5 text-pink-500">{text}</div>
    </div>
  )
}

export const Slogan = {
  Icon,
}
