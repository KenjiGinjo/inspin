import { APP } from '@inspin/constants'
import { cn } from '@/lib/utils'

interface SloganProps {
  text?: string
  className?: string
  variant?: 'default' | 'hero' | 'minimal'
}

function Icon({ text, className, variant = 'default' }: SloganProps) {
  const variants = {
    default: {
      container: 'py-8 sm:py-12',
      appName: 'text-6xl sm:text-7xl lg:text-8xl font-black',
      subtitle: 'text-base sm:text-lg font-semibold mt-4',
      spacing: 'gap-4',
    },
    hero: {
      container: 'py-16 sm:py-20 lg:py-24',
      appName: 'text-7xl sm:text-8xl lg:text-9xl font-black',
      subtitle: 'text-xl sm:text-2xl lg:text-3xl font-bold mt-6',
      spacing: 'gap-6',
    },
    minimal: {
      container: 'py-4 sm:py-6',
      appName: 'text-4xl sm:text-5xl font-bold',
      subtitle: 'text-sm sm:text-base font-medium mt-2',
      spacing: 'gap-2',
    },
  }

  const currentVariant = variants[variant]

  return (
    <div className={cn(
      'w-full flex flex-col items-center justify-center relative overflow-hidden',
      currentVariant.container,
      currentVariant.spacing,
      className,
    )}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-purple-50/20" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 rounded-full blur-2xl animate-pulse" />

      {/* 主要内容 */}
      <div className="relative z-10 text-center">
        {/* 应用名称 - 带渐变和动画效果 */}
        <div className={cn(
          'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent',
          'animate-gradient-x bg-[length:200%_auto]',
          'hover:scale-105 transition-transform duration-500 ease-out',
          currentVariant.appName,
        )}
        >
          {APP.appName}
        </div>

        {/* 副标题 */}
        {text && (
          <div className={cn(
            'text-pink-600 dark:text-pink-400',
            'max-w-2xl mx-auto leading-relaxed',
            'opacity-90 hover:opacity-100 transition-opacity duration-300',
            currentVariant.subtitle,
          )}
          >
            {text}
          </div>
        )}

        {/* 装饰性元素 */}
        <div className="flex items-center justify-center mt-6 sm:mt-8 gap-2">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

// 温和落地的 slogan 变体
function HeroSlogan({ className }: { className?: string }) {
  return (
    <Icon
      text="每天一个小改变，慢慢变成更好的自己"
      variant="hero"
      className={className}
    />
  )
}

function WelcomeSlogan({ className }: { className?: string }) {
  return (
    <Icon
      text="欢迎来到你的成长小站"
      variant="minimal"
      className={className}
    />
  )
}

function MotivationalSlogan({ className }: { className?: string }) {
  return (
    <Icon
      text="从今天开始，给自己一些新的尝试"
      variant="default"
      className={className}
    />
  )
}

// 新增更多温和变体
function InspiringSlogan({ className }: { className?: string }) {
  return (
    <Icon
      text="小小的坚持，大大的收获"
      variant="hero"
      className={className}
    />
  )
}

function GrowthSlogan({ className }: { className?: string }) {
  return (
    <Icon
      text="慢慢来，比较快"
      variant="default"
      className={className}
    />
  )
}

function ChallengeSlogan({ className }: { className?: string }) {
  return (
    <Icon
      text="尝试新事物，发现新可能"
      variant="hero"
      className={className}
    />
  )
}

export const Slogan = {
  Icon,
  Hero: HeroSlogan,
  Welcome: WelcomeSlogan,
  Motivational: MotivationalSlogan,
  Inspiring: InspiringSlogan,
  Growth: GrowthSlogan,
  Challenge: ChallengeSlogan,
}
