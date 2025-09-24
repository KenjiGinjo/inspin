import { IconEmotionSadFill, IconEmotionSadLine, IconFireFill, IconFireLine, IconUserFill, IconUserLine } from '@inspin/svg'
import { cloneElement } from 'react'
import { Link, useLocation } from 'wouter'
import { cn } from '@/lib/utils'
import { FixBottomBar } from './fix-bottom-bar'

const data = [
  {
    to: '/',
    icon: <IconFireLine />,
    iconActive: <IconFireFill />,
    text: '冒险',
  },
  {
    to: '/regrets',
    icon: <IconEmotionSadLine />,
    iconActive: <IconEmotionSadFill />,
    text: '遗憾',
  },
  {
    to: '/user',
    icon: <IconUserLine />,
    iconActive: <IconUserFill />,
    text: '我的',
  },
]

interface TabbarItemProps {
  to: string
  icon: React.ReactElement
  iconActive: React.ReactElement
  text: string
  active: boolean
}

function TabbarItem({ to, icon, iconActive, text, active }: TabbarItemProps) {
  const currentIcon = active ? iconActive : icon
  const iconColor = active ? 'text-primary' : 'text-muted-foreground'
  const textColor = active ? 'text-primary' : 'text-muted-foreground'

  return (
    <Link to={to}>
      <div className={cn(
        'flex flex-col items-center justify-center p-3 px-4 rounded-lg transition-all duration-200',
        'hover:bg-accent/50 active:scale-95 min-w-[80px]',
        active && 'bg-accent/30',
      )}
      >
        {cloneElement(currentIcon, {
          className: `size-5 sm:size-6 ${iconColor} transition-colors duration-200`,
        } as React.SVGProps<SVGSVGElement>)}
        <div className={`text-xs sm:text-sm font-medium ${textColor} transition-colors duration-200 mt-1`}>
          {text}
        </div>
      </div>
    </Link>
  )
}

export function Tabbar() {
  const [location] = useLocation()

  return (
    <FixBottomBar>
      {data.map(item => (
        <TabbarItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          iconActive={item.iconActive}
          text={item.text}
          active={location === item.to}
        />
      ))}
    </FixBottomBar>
  )
}
