import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { useState } from 'react'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { Request } from '@/components/request'
import { Tabbar } from '@/components/tabbar'
import { Button } from '@/components/ui/button'
import { $qc } from '@/query-client'

export function PageRegrets() {
  const [activeTab, setActiveTab] = useState<'failed' | 'finished'>('failed')
  const qc = useQueryClient()

  return (
    <MainLayout>
      <Header.MainPage color="pink" />

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* 标签切换 */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('failed')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'failed'
                ? 'bg-white text-pink-600 shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            失败记录
          </button>
          <button
            onClick={() => setActiveTab('finished')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'finished'
                ? 'bg-white text-pink-600 shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            完成记录
          </button>
        </div>

        {/* 失败冒险列表 */}
        {activeTab === 'failed' && (
          <QueryPageList
            queryRoute={$qc.userTodo.pageForFailed.$get}
            queryArgs={{}}
            showLoadingOnFetching
            refetchOnLoad
            renderEmpty={(
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">暂无失败记录</h3>
                <p className="text-gray-500">继续保持，避免失败！</p>
              </div>
            )}
            renderItem={({ data }) => (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-full border border-red-200">
                    {data.category || '未分类'}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {new Date(data.failedAt!).toLocaleDateString()}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <p className="text-gray-800 text-lg leading-relaxed font-medium">{data.description}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    创建时间:
                    {' '}
                    {new Date(data.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <Request
                    request={async () => {
                      await $qc.adventure[':userTodoId'].finish.$post.mutation({
                        params: { userTodoId: data.id },
                      })
                    }}
                    onSuccess={() => {
                      // 刷新失败记录和完成记录
                      $qc.userTodo.pageForFailed.$get.invalidateQueries(qc)
                      $qc.userTodo.pageForFinished.$get.invalidateQueries(qc)
                    }}
                    showLoading
                    showModal
                    showModalOption={{
                      description: '你确定要将这个失败的任务标记为完成吗？',
                    }}
                  >
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      标记为完成
                    </Button>
                  </Request>
                </div>
              </div>
            )}
          />
        )}

        {/* 已完成冒险列表 */}
        {activeTab === 'finished' && (
          <QueryPageList
            queryRoute={$qc.userTodo.pageForFinished.$get}
            queryArgs={{}}
            showLoadingOnFetching
            refetchOnLoad
            renderEmpty={(
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">暂无完成记录</h3>
                <p className="text-gray-500">开始你的第一个冒险任务吧！</p>
              </div>
            )}
            renderItem={({ data }) => (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200">
                    {data.category || '未分类'}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {new Date(data.finishedAt!).toLocaleDateString()}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <p className="text-gray-800 text-lg leading-relaxed font-medium">{data.description}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    创建时间:
                    {' '}
                    {new Date(data.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Success Badge */}
                <div className="flex justify-end">
                  <div className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    已完成
                  </div>
                </div>
              </div>
            )}
          />
        )}
      </div>

      <Tabbar />
    </MainLayout>
  )
}
