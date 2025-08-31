import { IconFireFill, IconFireLine, IconHome2Fill, IconHome2Line, IconUserFill, IconUserLine } from '@inspin/svg'
import { cloneElement } from 'react'
import { Link, useLocation } from 'wouter'
import { FixBottomBar } from './fix-bottom-bar'

const data = [
  {
    to: '/',
    icon: <IconHome2Line />,
    iconActive: <IconHome2Fill />,
    text: '冒险',
  },
  {
    to: '/regrets',
    icon: <IconFireLine />,
    iconActive: <IconFireFill />,
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
  const iconColor = active ? 'text-pink-500' : 'text-gray-700'
  const textColor = active ? 'text-pink-500' : 'text-gray-700'

  return (
    <Link to={to}>
      <div className="flex flex-col items-center justify-center">
        {cloneElement(currentIcon, { className: `size-6 ${iconColor}` } as React.SVGProps<SVGSVGElement>)}
        <div className={`text-xs ${textColor}`}>{text}</div>
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
