import { useState } from 'react'
import { Button } from './ui/button'

interface ExpendedBlockProps {
  children: React.ReactNode
  maxHeight: number
  buttonText: string
}

export function ExpendedBlock({ children, maxHeight, buttonText }: ExpendedBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      <div
        style={{
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out',
          maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
        }}
      >
        {children}
      </div>

      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-42 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}

      <div className="absolute bottom-0 left-0 right-0 text-center">
        {!isExpanded && (
          <Button
            onClick={() => setIsExpanded(true)}
            variant="outline"
            className="rounded-full border-gray-500"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}
