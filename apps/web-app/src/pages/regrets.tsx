import { useState } from 'react'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { Tabbar } from '@/components/tabbar'
import { $qc } from '@/query-client'

export function PageRegrets() {
  const [activeTab, setActiveTab] = useState<'failed' | 'finished'>('failed')

  return (
    <MainLayout>
      <Header.MainPage color="pink" />

      <div className="p-4">
        {/* 标签切换 */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('failed')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'failed'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            失败记录
          </button>
          <button
            onClick={() => setActiveTab('finished')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'finished'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
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
            renderEmpty={<div className="text-center py-8 text-gray-500">暂无失败记录</div>}
            renderItem={({ data }) => (
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    {data.category || '未分类'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(data.failedAt!).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{data.description}</p>
                <div className="text-xs text-gray-500">
                  创建时间:
                  {' '}
                  {new Date(data.createdAt).toLocaleDateString()}
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
            renderEmpty={<div className="text-center py-8 text-gray-500">暂无完成记录</div>}
            renderItem={({ data }) => (
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {data.category || '未分类'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(data.finishedAt!).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{data.description}</p>
                <div className="text-xs text-gray-500">
                  创建时间:
                  {' '}
                  {new Date(data.createdAt).toLocaleDateString()}
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
