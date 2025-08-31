import { observable } from '@legendapp/state'
import { useSelector } from '@legendapp/state/react'
import { get } from 'radash'
import React from 'react'
import { $qc } from '@/query-client'

interface State {
  isLoading: boolean
  isSignin: boolean
  token: string
}

export const $state = observable<State>({

  isLoading: false,
  isSignin: false,
  token: '',
})

export const auth = {

  setToken: (token: string): void => {
    $state.token.set(token)
  },

  setIsSignin: (isSignin: boolean): void => {
    $state.isSignin.set(isSignin)
  },

  useSignin: () => {
    const { isLoading, isSignin, token } = useSelector(() => $state)

    React.useEffect(() => {
      (async () => {
        if (!isSignin && !isLoading) {
          $state.isLoading.set(true)
          const res = await $qc.user.state.$get.query()
          const isLogin = get(res, 'body.data', false)
          $state.isSignin.set(isLogin)
          $state.isLoading.set(false)
        }
      })()
    }, [])
    return { isLoading, isSignin, token }
  },
}
