import { THEME } from '@inspin/constants'
import { IconGroup } from '@inspin/svg'
import { navigate } from 'wouter/use-browser-location'
import { config } from '@/config'
import { Button } from '../ui/button'

export function AuthSection({ message = '当前页面需要登录才能访问' }: { message?: string }) {
  return (
    <div className="h-full flex flex-col items-center pt-60 px-4">
      <IconGroup width={48} height={48} color={THEME.colors.gray[300]} />
      <div className="pb-10 pt-2 text-gray-300">{message}</div>
      <Button
        onClick={() => {
          navigate(config.loginPagePath.get(), { replace: true })
        }}
        className="rounded-full font-bold w-[65%]"
      >
        去登陆
      </Button>
    </div>
  )
}
