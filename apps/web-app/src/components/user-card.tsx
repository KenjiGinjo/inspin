import type { ResUserBase } from '@inspin/interfaces'
import React from 'react'
import { config } from '@/config'
import { cn } from '@/lib/utils'
import { AvatarFallback, AvatarImage, Avatar as AvatarPrimitive } from './ui/avatar'

interface AvatarAndNicknameProps {
  data: ResUserBase
  className?: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

function AvatarAndNickname({ data, className, size = 'md', onClick }: AvatarAndNicknameProps) {
  const nickname = data.profile?.nickname || ''
  const avatarFallback = nickname ? nickname.slice(0, 1) : 'None'
  const avatar = `${config.baseURL.get()}/${data.profile?.avatar}` || '/no-image.png'

  return (
    <div className={cn('flex items-center gap-2', className)} onClick={onClick}>
      <AvatarPrimitive className={cn(size === 'sm' && 'size-8', size === 'lg' && 'size-16')}>
        <AvatarImage src={avatar} alt={nickname} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </AvatarPrimitive>
      <div className="text-gray-700 font-bold">{nickname}</div>
    </div>
  )
}

function AssetItem({ icon, title, value, className }: { icon: React.ReactElement, title: string, value: string | number, className?: string }) {
  const _icon = React.cloneElement(icon, { className: 'size-4' } as React.SVGProps<SVGSVGElement>)

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex items-center gap-2">
        {_icon}
        <span className="text-sm font-bold">{value}</span>
      </div>
      <div className="text-xs text-gray-400 scale-90">{title}</div>
    </div>
  )
}

function MainEntryItem({ icon, label, className, onClick }: { icon: React.ReactElement, label: string, className?: string, onClick?: () => void }) {
  const _icon = React.cloneElement(icon, { className: 'size-12 text-gray-700' } as React.SVGProps<SVGSVGElement>)

  return (
    <div className={cn('flex flex-col items-center', className)} onClick={onClick}>
      <div className="rounded-full bg-gray-200 p-2 size-20 flex items-center justify-center mb-1">
        {_icon}
      </div>
      <span className="text-sm font-bold text-gray-700">{label}</span>
    </div>
  )
}

function SubEntryItem({ icon, label, className, onClick }: { icon: React.ReactElement, label: string, className?: string, onClick?: () => void }) {
  const _icon = React.cloneElement(icon, { className: 'size-8 text-gray-700' } as React.SVGProps<SVGSVGElement>)

  return (
    <div className={cn('flex flex-col items-center w-full bg-gray-200 rounded-lg p-4', className)} onClick={onClick}>
      {_icon}
      <span className="text-sm font-bold text-gray-700">{label}</span>
    </div>
  )
}

function Cell({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return <div className="flex items-center justify-between py-2 text-gray-700 border-b border-gray-200" onClick={onClick}>{children}</div>
}

export const UserCard = {
  AvatarAndNickname,
  AssetItem,
  MainEntryItem,
  SubEntryItem,
  Cell,
}
