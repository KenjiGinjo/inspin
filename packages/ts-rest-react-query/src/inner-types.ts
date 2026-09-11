import type {
  FetchQueryOptions,
  InfiniteData,
  QueryClient,
  QueryFilters,
  QueryFunctionContext,
  QueryKey,
} from '@tanstack/react-query'
import type {
  AppRoute,
  AreAllPropertiesOptional,
  ClientArgs,
  PartialClientInferRequest,
} from '@ts-rest/core'
import type {
  DataResponse,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from './types'

export interface AppRouteFunctions<TAppRoute extends { method?: string, path?: string, responses?: any }, TClientArgs extends ClientArgs> {
  invalidateQueries: TAppRoute extends { method: 'GET' } ? (queryClient: QueryClient, args?: any) => void : never
  getQueryKey: TAppRoute extends { method: 'GET' } ? (args?: any) => QueryKey : never
  useQuery: TAppRoute extends { method: 'GET' } ? (args?: any, options?: any) => {
    data?: { body: any, status: number }
    refetch: () => any
    isLoading: boolean
    isFetching: boolean
    error: unknown
  } : never
  useInfiniteQuery: TAppRoute extends { method: 'GET' } ? (args: any, options?: any) => any : never
  useQueries: TAppRoute extends { method: 'GET' } ? DataReturnQueries<TAppRoute & AppRoute, TClientArgs> : never
  query: TAppRoute extends { method: 'GET' } ? (args?: any) => Promise<{ status: number, body: any, headers?: any }> : never
  useMutation: TAppRoute extends { method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' } ? (options?: any) => any : never
  mutation: TAppRoute extends { method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' } ? (args?: any) => Promise<{ status: number, body: any, headers?: any }> : never
  fetchQuery: TAppRoute extends { method: 'GET' } ? DataReturnFetchQuery<TAppRoute & AppRoute, TClientArgs> : never
  fetchInfiniteQuery: TAppRoute extends { method: 'GET' } ? DataReturnFetchInfiniteQuery<TAppRoute & AppRoute, TClientArgs> : never
  prefetchQuery: TAppRoute extends { method: 'GET' } ? DataReturnPrefetchQuery<TAppRoute & AppRoute, TClientArgs> : never
  prefetchInfiniteQuery: TAppRoute extends { method: 'GET' }
    ? DataReturnPrefetchInfiniteQuery<TAppRoute & AppRoute, TClientArgs>
    : never
  getQueryData: TAppRoute extends { method: 'GET' } ? DataReturnGetQueryData<TAppRoute & AppRoute> : never
  ensureQueryData: TAppRoute extends { method: 'GET' } ? DataReturnFetchQuery<TAppRoute & AppRoute, TClientArgs> : never
  getQueriesData: TAppRoute extends { method: 'GET' } ? DataReturnGetQueriesData<TAppRoute & AppRoute> : never
  setQueryData: TAppRoute extends { method: 'GET' } ? DataReturnSetQueryData<TAppRoute & AppRoute> : never
}

export type AppRouteFunctionsWithQueryClient<
  TAppRoute extends { method?: string, path?: string, responses?: any },
  TClientArgs extends ClientArgs,
> = AppRouteFunctions<TAppRoute, TClientArgs> & {
  fetchQuery: TAppRoute extends { method: 'GET' } ? DataReturnFetchQueryHook<TAppRoute & AppRoute, TClientArgs> : never
  fetchInfiniteQuery: TAppRoute extends { method: 'GET' }
    ? DataReturnFetchInfiniteQueryHook<TAppRoute & AppRoute, TClientArgs>
    : never
  prefetchQuery: TAppRoute extends { method: 'GET' } ? DataReturnPrefetchQueryHook<TAppRoute & AppRoute, TClientArgs> : never
  prefetchInfiniteQuery: TAppRoute extends { method: 'GET' }
    ? DataReturnPrefetchInfiniteQueryHook<TAppRoute & AppRoute, TClientArgs>
    : never
  getQueryData: TAppRoute extends { method: 'GET' } ? DataReturnGetQueryDataHook<TAppRoute & AppRoute> : never
  ensureQueryData: TAppRoute extends { method: 'GET' } ? DataReturnFetchQueryHook<TAppRoute & AppRoute, TClientArgs> : never
  getQueriesData: TAppRoute extends { method: 'GET' } ? DataReturnGetQueriesDataHook<TAppRoute & AppRoute> : never
  setQueryData: TAppRoute extends { method: 'GET' } ? DataReturnSetQueryDataHook<TAppRoute & AppRoute> : never
}

// Used on X.useQuery
export type DataReturnQuery<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> =
  AreAllPropertiesOptional<TArgs> extends true
    ? (args?: TArgs, options?: UseQueryOptions<TAppRoute>) => UseQueryResult<TAppRoute>
    : (args: TArgs, options?: UseQueryOptions<TAppRoute>) => UseQueryResult<TAppRoute>

export type DataReturnQueriesOptions<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
> = PartialClientInferRequest<TAppRoute, TClientArgs> &
  Omit<UseQueryOptions<TAppRoute>, 'queryFn'> & {
    queryKey: QueryKey
  }

export type DataReturnQueries<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TQueries = readonly DataReturnQueriesOptions<TAppRoute, TClientArgs>[],
> = (args: { queries: TQueries, context?: UseQueryOptions<TAppRoute>['context'] }) => UseQueryResult<TAppRoute>[]

// Used on X.useInfiniteQuery
export type DataReturnInfiniteQuery<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> = (
  args: (context: QueryFunctionContext<QueryKey>) => PartialClientInferRequest<TAppRoute, TClientArgs>,
  options?: UseInfiniteQueryOptions<TAppRoute>,
) => UseInfiniteQueryResult<TAppRoute>

// Used pn X.useMutation
export type DataReturnMutation<TAppRoute extends AppRoute, TClientArgs extends ClientArgs> = (
  options?: UseMutationOptions<TAppRoute, TClientArgs>,
) => UseMutationResult<TAppRoute, TClientArgs>

export type DataReturnInvalidateQueries<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> = (queryClient: QueryClient, args?: TArgs) => void

export type DataReturnFetchQuery<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> =
  AreAllPropertiesOptional<TArgs> extends true
    ? (
        queryClient: QueryClient,
        queryKey: QueryKey,
        args?: TArgs,
        options?: FetchQueryOptions<TAppRoute>,
      ) => Promise<DataResponse<TAppRoute>>
    : (
        queryClient: QueryClient,
        queryKey: QueryKey,
        args: TArgs,
        options?: FetchQueryOptions<TAppRoute>,
      ) => Promise<DataResponse<TAppRoute>>

export type DataReturnFetchQueryHook<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> =
  AreAllPropertiesOptional<TArgs> extends true
    ? (queryKey: QueryKey, args?: TArgs, options?: FetchQueryOptions<TAppRoute>) => Promise<DataResponse<TAppRoute>>
    : (queryKey: QueryKey, args: TArgs, options?: FetchQueryOptions<TAppRoute>) => Promise<DataResponse<TAppRoute>>

export type DataReturnPrefetchQuery<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> =
  AreAllPropertiesOptional<TArgs> extends true
    ? (
        queryClient: QueryClient,
        queryKey: QueryKey,
        args?: TArgs,
        options?: FetchQueryOptions<TAppRoute>,
      ) => Promise<void>
    : (
        queryClient: QueryClient,
        queryKey: QueryKey,
        args: TArgs,
        options?: FetchQueryOptions<TAppRoute>,
      ) => Promise<void>

export type DataReturnPrefetchQueryHook<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> =
  AreAllPropertiesOptional<TArgs> extends true
    ? (queryKey: QueryKey, args?: TArgs, options?: FetchQueryOptions<TAppRoute>) => Promise<void>
    : (queryKey: QueryKey, args: TArgs, options?: FetchQueryOptions<TAppRoute>) => Promise<void>

export type DataReturnFetchInfiniteQuery<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> = (
  queryClient: QueryClient,
  queryKey: QueryKey,
  args: (context: QueryFunctionContext) => TArgs,
  options?: FetchQueryOptions<TAppRoute>,
) => Promise<InfiniteData<DataResponse<TAppRoute>>>

export type DataReturnFetchInfiniteQueryHook<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> = (
  queryKey: QueryKey,
  args: (context: QueryFunctionContext) => TArgs,
  options?: FetchQueryOptions<TAppRoute>,
) => Promise<InfiniteData<DataResponse<TAppRoute>>>

export type DataReturnPrefetchInfiniteQuery<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> = (
  queryClient: QueryClient,
  queryKey: QueryKey,
  args: (context: QueryFunctionContext) => TArgs,
  options?: FetchQueryOptions<TAppRoute>,
) => Promise<void>

export type DataReturnPrefetchInfiniteQueryHook<
  TAppRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TAppRoute, TClientArgs>,
> = (
  queryKey: QueryKey,
  args: (context: QueryFunctionContext) => TArgs,
  options?: FetchQueryOptions<TAppRoute>,
) => Promise<void>

export type DataReturnGetQueryData<TAppRoute extends AppRoute> = (
  queryClient: QueryClient,
  queryKey: QueryKey,
  filters?: QueryFilters,
) => DataResponse<TAppRoute> | undefined

export type DataReturnGetQueryDataHook<TAppRoute extends AppRoute> = (
  queryKey: QueryKey,
  filters?: QueryFilters,
) => DataResponse<TAppRoute> | undefined

export type DataReturnGetQueriesData<TAppRoute extends AppRoute> = (
  queryClient: QueryClient,
  filters: QueryFilters,
) => [queryKey: QueryKey, data: DataResponse<TAppRoute> | undefined][]

export type DataReturnGetQueriesDataHook<TAppRoute extends AppRoute> = (
  filters: QueryFilters,
) => [queryKey: QueryKey, data: DataResponse<TAppRoute> | undefined][]

export type DataReturnSetQueryData<TAppRoute extends AppRoute> = (
  queryClient: QueryClient,
  queryKey: QueryKey,
  updater:
    | DataResponse<TAppRoute>
    | undefined
    | ((oldData: DataResponse<TAppRoute> | undefined) => DataResponse<TAppRoute> | undefined),
) => DataResponse<TAppRoute> | undefined

export type DataReturnSetQueryDataHook<TAppRoute extends AppRoute> = (
  queryKey: QueryKey,
  updater:
    | DataResponse<TAppRoute>
    | undefined
    | ((oldData: DataResponse<TAppRoute> | undefined) => DataResponse<TAppRoute> | undefined),
) => DataResponse<TAppRoute> | undefined
