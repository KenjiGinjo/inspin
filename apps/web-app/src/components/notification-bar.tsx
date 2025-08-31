import { useState } from 'react'
import { Button } from './ui/button'

export function NotificationBar({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true)

  if (!show) {
    return null
  }

  return (
    <div className="py-3 text-sm px-4 bg-gray-500 w-full flex items-center justify-between text-white">
      {children}
      <Button size="sm" className="rounded-full px-5 text-sm font-bold ml-10" onClick={() => setShow(false)}>
        OK
      </Button>
    </div>
  )
}
