import type { ResUserTodoList } from '@inspin/interfaces'
import { BeijingDate, getRemainingTime } from '@inspin/tools/both'
import { useSelector } from '@legendapp/state/react'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Request } from '@/components/request'
import { Tabbar } from '@/components/tabbar'
import { Button } from '@/components/ui/button'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'

function Page({ data }: { data: ResUserTodoList | null | 'fullfilled-in-last-7-days' }) {
  const qc = useQueryClient()
  const { end } = BeijingDate.getWeekRange()
  const { days, hours, minutes } = getRemainingTime(end)

  if (data === 'fullfilled-in-last-7-days') {
    return (
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              本周冒险已完成！
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              恭喜你完成了本周的冒险任务！继续保持这种精神，下周再来挑战吧。
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-3">下次任务刷新时间</h3>
            <div className="flex items-center justify-center gap-4 text-center">
              <div className="bg-white rounded-lg p-3 min-w-[60px] shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{days}</div>
                <div className="text-xs text-blue-500">天</div>
              </div>
              <div className="bg-white rounded-lg p-3 min-w-[60px] shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{hours}</div>
                <div className="text-xs text-blue-500">小时</div>
              </div>
              <div className="bg-white rounded-lg p-3 min-w-[60px] shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{minutes}</div>
                <div className="text-xs text-blue-500">分钟</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">开始你的冒险之旅</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
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
            <Button className="w-full max-w-xs h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              开始冒险
            </Button>
          </Request>
        </div>
      </div>
    )
  }

  // 显示当前冒险任务
  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">当前冒险</h2>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
              {data.category || '未分类'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-8">
            <p className="text-gray-800 text-lg leading-relaxed font-medium">{data.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Request
              request={async () => {
                await $qc.adventure[':userTodoId'].finish.$post.mutation({
                  params: { userTodoId: data.id },
                })
              }}
              onSuccess={() => {
                $qc.adventure.$get.invalidateQueries(qc)
              }}
              showLoading
              showModal
              showModalOption={{
                description: '你确定要将这个冒险任务标记为完成吗？',
              }}
            >
              <Button className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                标记为完成
              </Button>
            </Request>

            <Request
              request={async () => {
                await $qc.adventure[':userTodoId'].fail.$post.mutation({
                  params: { userTodoId: data.id },
                })
              }}
              onSuccess={() => {
                $qc.adventure.$get.invalidateQueries(qc)
              }}
              showLoading
              showModal
              showModalOption={{
                description: '你确定要标记这个冒险任务为失败吗？',
              }}
            >
              <Button variant="outline" className="flex-1 h-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200">
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

      {/* Hero Section */}
      <div className="px-4 py-8 text-center bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            坚持下去，这个应用会让你变成一个什么样的人呢？
          </h1>
          <p className="text-gray-600 text-lg">
            每一次冒险都是成长的机会，每一次坚持都是力量的积累
          </p>
        </div>
      </div>

      {/* Main Content */}
      {!$user
        ? (
            <div className="px-4 py-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">需要登录才能体验</h2>
                <p className="text-gray-600">去登录体验游玩吧，开启你的冒险之旅！</p>
              </div>
            </div>
          )
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
