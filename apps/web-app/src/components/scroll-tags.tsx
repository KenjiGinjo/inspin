import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollTagsProps {
  defaultSelectedTag?: string
  tags: string[]
  onSelect: (tag: string) => void
  className?: string
}

export function ScrollTags({ defaultSelectedTag, tags, onSelect, className }: ScrollTagsProps) {
  const [selectedTag, setSelectedTag] = useState<string>(defaultSelectedTag || tags[0])

  return (
    <div
      className={cn('flex gap-2 overflow-x-scroll text-gray-500 text-sm', className)}
      style={{ scrollbarWidth: 'none' }}
    >
      {tags.map(tag => (
        <div
          key={tag}
          className={cn(
            'bg-gray-100 rounded-md px-2 py-1 shrink-0',
            selectedTag === tag && 'bg-pink-100 font-bold text-gray-700',
          )}
          onClick={() => {
            setSelectedTag(tag)
            onSelect(tag)
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  )
}
