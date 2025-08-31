import type { ResAdventure } from '@inspin/interfaces'
import { toast } from 'sonner'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Request } from '@/components/request'
import { Tabbar } from '@/components/tabbar'
import { Button } from '@/components/ui/button'
import { $qc } from '@/query-client'

function Page({ data }: { data: ResAdventure }) {
  // 如果没有冒险数据，显示领取冒险按钮
  if (!data || data === 'fullfilled-in-last-7-days') {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {data === 'fullfilled-in-last-7-days' ? '本周冒险已完成' : '开始你的冒险之旅'}
          </h2>
          <p className="text-gray-600 mb-6">
            {data === 'fullfilled-in-last-7-days'
              ? '恭喜你完成了本周的冒险任务！下周再来挑战吧。'
              : '点击下方按钮领取一个随机冒险任务。'}
          </p>

          {data !== 'fullfilled-in-last-7-days' && (
            <Request
              request={() => $qc.adventure.$post.mutation()}
              onSuccess={() => {
                toast.success('冒险任务领取成功！')
              }}
              showLoading
              showLoadingOption={{ title: '领取中...' }}
            >
              <Button>开始冒险 </Button>
            </Request>
          )}
        </div>
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
                params: { userTodoId: data.userTodoId },
              })
            }}
            onSuccess={() => {
              toast.success('冒险完成！恭喜你！')
              window.location.reload()
            }}
            showLoading
            showLoadingOption={{ title: '完成中...' }}
            showModal
            showModalOption={{
              title: '确认完成',
              description: '你确定要完成这个冒险任务吗？',
            }}
          >
            <Button> 完成冒险 </Button>
          </Request>

          <Request
            request={async () => {
              await $qc.adventure[':userTodoId'].fail.$post.mutation({
                params: { userTodoId: data.userTodoId },
              })
            }}
            onSuccess={() => {
              toast.success('冒险失败，下次再加油！')
              window.location.reload()
            }}
            showLoading
            showLoadingOption={{ title: '处理中...' }}
            showModal
            showModalOption={{
              title: '确认失败',
              description: '你确定要标记这个冒险任务为失败吗？',
            }}
          >
            <Button> 冒险失败 </Button>
          </Request>
        </div>
      </div>
    </div>
  )
}

export function PageHome() {
  return (
    <MainLayout>
      <Header.MainPage color="pink" />
      <p>坚持下去，这个应用会让你变成一个什么样的人呢？</p>
      <QueryData
        showLoadingOnFetching
        refetchOnLoad
        queryRoute={$qc.adventure.$get}
        queryArgs={{}}
        renderData={({ data }) => <Page data={data} />}
      />
      <Tabbar />
    </MainLayout>
  )
}
