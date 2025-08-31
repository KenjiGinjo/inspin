import { IconEyeFill, IconStarFill } from '@inspin/svg'
import { cn } from '@/lib/utils'

function View({ count, className }: { count: number, className?: string }) {
  const _countStr = count > 1000 ? `${(count / 1000).toFixed(1)}k` : count
  return (
    <div className={cn('flex items-center gap-1 text-gray-400', className)}>
      <IconEyeFill className="size-3" />
      <div className="text-xs">
        {_countStr}
      </div>
    </div>
  )
}

function Collection({ count, className }: { count: number, className?: string }) {
  const _countStr = count > 1000 ? `${(count / 1000).toFixed(1)}k` : count
  return (
    <div className={cn('flex items-center gap-1 text-gray-400', className)}>
      <IconStarFill className="size-3" />
      <div className="text-xs">
        {_countStr}
      </div>
    </div>
  )
}

export const Analysis = {
  View,
  Collection,
}
