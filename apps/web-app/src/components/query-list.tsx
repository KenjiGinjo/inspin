import type { ReactElement, ReactNode } from 'react'
import { cloneElement, useEffect } from 'react'
import { usePageVisibility } from '@/hooks/life-time'
import { Empty } from './empty'
import { Loading } from './loading'

interface QueryListProps {
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
  renderItem: (item: any) => ReactNode
  renderProcessor?: (items: any) => any
  hookRequested?: (data: any) => void
  renderEmpty: ReactElement
  renderWrapper?: ReactElement
  showLoadingOnFetching?: boolean
  refetchOnLoad?: boolean
  refetchOnPageVisible?: boolean
}

export function QueryList({
  queryRoute,
  queryArgs,
  queryOptions = {},
  renderItem,
  renderProcessor = data => data,
  hookRequested,
  renderEmpty,
  renderWrapper: Wrapper = <div />,
  showLoadingOnFetching = false,
  refetchOnLoad = false,
  refetchOnPageVisible = false,
}: QueryListProps) {
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
    const processed = renderProcessor(data.body.data)

    if (!Array.isArray(processed)) {
      return <Empty.Icon message="列表数据格式错误" />
    }
    else if (processed.length === 0) {
      return renderEmpty
    }
    else {
      return cloneElement(
        Wrapper,
        {},
        processed.map((_item: any) => renderItem({ ...data.body, data: _item })),
      )
    }
  }
}
