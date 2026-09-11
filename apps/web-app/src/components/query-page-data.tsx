import { objectHash } from 'ohash'
import { get } from 'radash'
import { type ReactNode, useEffect, useMemo } from 'react'
import { useLocation } from 'wouter'
import { usePageVisibility, useReachBottom } from '@/hooks'
import { stateQueryListRemoves } from '../states'
import { Loading } from './loading'

interface QueryPageDataProps {
  queryRoute: {
    useInfiniteQuery: (args: any, options?: any) => any
    getQueryKey: (args?: any) => readonly unknown[]
  }
  queryArgs?: any
  queryOptions?: any
  renderData: (data: { data: any[], page: { params: number[] } }) => ReactNode
  hookRequested?: (data: { data: any[] }) => void
  showLoadingOnFetching?: boolean
  refetchOnLoad?: boolean
  refetchOnPageVisible?: boolean
  removeOnUnload?: boolean
  removeOnDidHide?: boolean
}

export function QueryPageData({
  queryRoute,
  queryArgs,
  queryOptions = {},
  renderData,
  hookRequested,
  showLoadingOnFetching = false,
  refetchOnLoad = false,
  refetchOnPageVisible = false,
  removeOnUnload = false,
  removeOnDidHide = false,
}: QueryPageDataProps) {
  const [path] = useLocation()

  const queryHash = objectHash(queryRoute.getQueryKey(queryArgs as any))

  const { isLoading, isFetching, error, data, refetch, hasNextPage, isFetchingNextPage, fetchNextPage, remove }
    = queryRoute.useInfiniteQuery(
      ({ pageParam = 1 }) => {
        return {
          ...queryArgs,
          query: { ...get(queryArgs, 'query', {}), page: pageParam },
        }
      },
      {
        getNextPageParam: (lastPage: any, allPages: any[]) => {
          if (lastPage.body.data.length === 0) {
            return undefined
          }

          return allPages.length + 1
        },
        ...queryOptions,
        hookRequested: (data: any) => hookRequested?.({ data: get(data, 'body.data', []) }),
      },
    )

  // 处理page
  const items = useMemo(() => {
    return data?.pages.map((page: any) => page.body.data).flat()
  }, [data])

  useReachBottom(() => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }

    // 在上滑滚动的时候, 也需要添加remove, `useEffect`只能监听到tab切换的情况, 当用户进入子页面再回退时, 不切换tab只上滑滚动时, 无法监听到
    if (removeOnUnload) {
      stateQueryListRemoves.add({ event: 'unload', path, queryHash, queryRemove: remove })
    }

    if (removeOnDidHide) {
      stateQueryListRemoves.add({ event: 'didHide', path, queryHash, queryRemove: remove })
    }
  })

  useEffect(() => {
    if (refetchOnLoad) {
      refetch()
    }
    return () => {
      if (removeOnUnload) {
        stateQueryListRemoves.run({ event: 'unload', path })
      }
    }
  }, [refetchOnLoad, refetch])

  usePageVisibility((visible) => {
    if (refetchOnPageVisible) {
      if (visible) {
        refetch()
      }
      else {
        if (removeOnDidHide) {
          stateQueryListRemoves.run({ event: 'didHide', path })
        }
      }
    }
  }, refetchOnPageVisible)

  useEffect(() => {
    if (removeOnUnload) {
      stateQueryListRemoves.add({ event: 'unload', path, queryHash, queryRemove: remove })
    }

    if (removeOnDidHide) {
      stateQueryListRemoves.add({ event: 'didHide', path, queryHash, queryRemove: remove })
    }
  }, [queryRoute, queryArgs, path, remove, removeOnUnload, removeOnDidHide, queryHash])

  // 处理loading
  const showLoading = showLoadingOnFetching ? isLoading || isFetching : isLoading

  if (showLoading) {
    return <Loading.Card />
  }
  else if (error || !items) {
    return <Loading.Error error={error} />
  }
  else {
    return (
      <>
        {renderData({ data: items, page: { params: (data?.pageParams as number[]) || [] } })}

        {hasNextPage === false && <div className="text-12 mt-16 h-32 text-center text-gray-300">- 到底了 -</div>}

        {hasNextPage === true && isFetching && (
          <div className="text-12 mt-16 h-32 text-center text-gray-300">加载中...</div>
        )}
      </>
    )
  }
}
