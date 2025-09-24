import type { ResUserTodoList } from '@inspin/interfaces'
import { BeijingDate, getRemainingTime } from '@inspin/tools/both'
import { useSelector } from '@legendapp/state/react'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { Header } from '@/components/header'
import { HomeBanner } from '@/components/home-banner'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Request } from '@/components/request'
import { Tabbar } from '@/components/tabbar'
import { Button } from '@/components/ui/button'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'

// 登录提示组件
function LoginPrompt() {
  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16 text-center">
      <div className="max-w-lg mx-auto">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">需要登录才能体验</h2>
        <p className="text-muted-foreground text-lg sm:text-xl mb-10 leading-relaxed">去登录体验游玩吧，开启你的冒险之旅！</p>

        <Button
          className="w-full max-w-sm h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          onClick={() => {
            // 这里应该导航到登录页面
            window.location.href = '/auth/login'
          }}
        >
          立即登录
        </Button>
      </div>
    </div>
  )
}

function Page({ data }: { data: ResUserTodoList | null | 'fullfilled-in-last-7-days' }) {
  const qc = useQueryClient()
  const { end } = BeijingDate.getWeekRange()
  const { days, hours, minutes } = getRemainingTime(end)

  if (data === 'fullfilled-in-last-7-days') {
    return (
      <div className="px-4 sm:px-6 py-6 w-full mx-auto">
        <div className="text-center py-12 sm:py-16">
          <div className="mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              本周冒险已完成！
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              恭喜你完成了本周的冒险任务！继续保持这种精神，下周再来挑战吧。
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-pink-100 shadow-lg">
            <h3 className="text-sm font-medium text-pink-800 mb-6">下次任务刷新时间</h3>
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-center">
              <div className="bg-white rounded-xl p-4 min-w-[70px] shadow-md">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600">{days}</div>
                <div className="text-xs sm:text-sm text-pink-500 font-medium">天</div>
              </div>
              <div className="bg-white rounded-xl p-4 min-w-[70px] shadow-md">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600">{hours}</div>
                <div className="text-xs sm:text-sm text-pink-500 font-medium">小时</div>
              </div>
              <div className="bg-white rounded-xl p-4 min-w-[70px] shadow-md">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600">{minutes}</div>
                <div className="text-xs sm:text-sm text-pink-500 font-medium">分钟</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="px-4 sm:px-6 py-6 w-full mx-auto">
        <div className="text-center py-12 sm:py-16">
          <div className="mb-10">
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">开始你的冒险之旅</h2>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              准备好接受挑战了吗？点击下方按钮开始你的第一个冒险任务！
            </p>
          </div>

          <Request
            request={() => $qc.adventure.$post.mutation()}
            onSuccess={() => {
              $qc.adventure.$get.invalidateQueries(qc)
            }}
            showLoading
          >
            <Button className="w-full max-w-sm h-16 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
              开始冒险
            </Button>
          </Request>
        </div>
      </div>
    )
  }

  // 显示当前冒险任务
  return (
    <div className="px-4 sm:px-6 py-6 w-full mx-auto">
      <div className="bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white">当前冒险</h2>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
              {data.category || '未分类'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="mb-10">
            <p className="text-card-foreground text-lg sm:text-xl leading-relaxed font-medium">{data.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Request
              request={() => $qc.userTodo[':id'].finish.$post.mutation({
                params: { id: data.id },
              })}
              onSuccess={() => {
                $qc.adventure.$get.invalidateQueries(qc)
              }}
              showLoading
              showModal
              showModalOption={{
                description: '你确定要将这个冒险任务标记为完成吗？',
              }}
            >
              <Button className="flex-1 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                标记为完成
              </Button>
            </Request>

            <Request
              request={() => $qc.userTodo[':id'].fail.$post.mutation({
                params: { id: data.id },
              })}
              onSuccess={() => {
                $qc.adventure.$get.invalidateQueries(qc)
              }}
              showLoading
              showModal
              showModalOption={{
                description: '你确定要标记这个冒险任务为失败吗？',
              }}
            >
              <Button variant="outline" className="flex-1 h-14 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 transform hover:scale-105 active:scale-95">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                标记为失败
              </Button>
            </Request>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PageHome() {
  const $user = useSelector(() => stateUser.getData())

  return (
    <MainLayout>
      <Header.MainPage color="pink" />
      <HomeBanner />

      {!$user
        ? <LoginPrompt />
        : (
            <QueryData
              showLoadingOnFetching
              refetchOnLoad
              queryRoute={$qc.adventure.$get}
              queryArgs={{}}
              renderData={({ data }) => <Page data={data} />}
            />
          )}

      <Tabbar />
    </MainLayout>
  )
}
