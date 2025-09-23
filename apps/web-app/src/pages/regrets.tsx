import { IconMore2Line } from '@inspin/svg'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { useState } from 'react'
import { GuardAuthPage } from '@/components/guard'
import { Header } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { Request } from '@/components/request'
import { Tabbar } from '@/components/tabbar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { $qc } from '@/query-client'

export function PageRegrets() {
  const [activeTab, setActiveTab] = useState<'failed' | 'finished'>('failed')
  const qc = useQueryClient()

  return (
    <MainLayout>
      <Header.MainPage color="pink" />
      <GuardAuthPage>
        <div className="px-4 py-6 max-w-2xl mx-auto">
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <IconMore2Line className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Request
                          request={() => $qc.adventure[':userTodoId'].finish.$post.mutation({
                            params: { userTodoId: data.id },
                          })}
                          onSuccess={() => {
                            $qc.userTodo.pageForFailed.$get.invalidateQueries(qc)
                            $qc.userTodo.pageForFinished.$get.invalidateQueries(qc)
                          }}
                        >
                          <DropdownMenuItem className="text-green-600 focus:text-green-600 focus:bg-green-50">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            标记为完成
                          </DropdownMenuItem>
                        </Request>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            />
          )}

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

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <IconMore2Line className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Request
                          request={() => $qc.adventure[':userTodoId'].pending.$post.mutation({
                            params: { userTodoId: data.id },
                          })}
                          onSuccess={() => {
                            $qc.userTodo.pageForFinished.$get.invalidateQueries(qc)
                            $qc.adventure.$get.invalidateQueries(qc)
                          }}
                        >
                          <DropdownMenuItem className="text-orange-600 focus:text-orange-600 focus:bg-orange-50">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            标记为未完成
                          </DropdownMenuItem>
                        </Request>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            />
          )}
        </div>
      </GuardAuthPage>
      <Tabbar />
    </MainLayout>
  )
}
