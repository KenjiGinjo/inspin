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
      <div className="p-4">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {data === 'fullfilled-in-last-7-days' ? '本周冒险已完成' : '开始你的冒险之旅'}
          </h2>
          <p className="text-gray-600 mb-6">
            你完成了本周的冒险任务！下周再来挑战吧。
            任务刷新时间：
            {days}
            天
            {hours}
            小时
            {minutes}
            分钟
          </p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">开始你的冒险之旅</h2>
        </div>
        <Request
          request={() => $qc.adventure.$post.mutation()}
          onSuccess={() => {
            $qc.adventure.$get.invalidateQueries(qc)
          }}
          showLoading

        >
          <Button className="w-full">开始冒险 </Button>
        </Request>
      </div>
    )
  }

  // 显示当前冒险任务
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">当前冒险</h2>
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
            {data.category || '未分类'}
          </span>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-lg leading-relaxed">{data.description}</p>
        </div>

        <div className="flex gap-3">
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
            <Button> 标记为完成 </Button>
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
            <Button variant="outline"> 标记为失败 </Button>
          </Request>
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
      <p>坚持下去，这个应用会让你变成一个什么样的人呢？</p>
      {!$user
        ? <div>去登陆体验游玩吧</div>
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
