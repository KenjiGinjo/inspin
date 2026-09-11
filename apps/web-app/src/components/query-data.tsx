import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { usePageVisibility } from '@/hooks/life-time'
import { Loading } from './loading'

interface QueryDataProps {
  queryRoute: {
    useQuery: (args?: any, options?: any) => {
      isLoading: boolean
      isFetching: boolean
      error: unknown
      data?: { body?: any }
      refetch: () => void
    }
  }
  queryArgs?: any
  queryOptions?: any
  renderData: (item: any) => ReactNode
  hookRequested?: (item: any) => void
  showLoadingOnFetching?: boolean
  refetchOnLoad?: boolean
  refetchOnPageVisible?: boolean
}

export function QueryData({
  queryRoute,
  queryArgs,
  queryOptions = {},
  renderData,
  hookRequested,
  showLoadingOnFetching = false,
  refetchOnLoad = false,
  refetchOnPageVisible = false,
}: QueryDataProps) {
  const { isLoading, isFetching, error, data, refetch } = queryRoute.useQuery(queryArgs, {
    ...queryOptions,
    hookRequested: ({ body }: { body: any }) => hookRequested?.(body),
  })

  useEffect(() => {
    if (refetchOnLoad) {
      refetch()
    }
  }, [refetchOnLoad, refetch])

  usePageVisibility((visible) => {
    if (refetchOnPageVisible && visible) {
      refetch()
    }
  }, refetchOnPageVisible)

  const showLoading = showLoadingOnFetching ? isLoading || isFetching : isLoading

  if (showLoading) {
    return <Loading.Card />
  }
  else if (error || !data) {
    return <Loading.Error error={error} />
  }
  else {
    return renderData(data.body)
  }
}
