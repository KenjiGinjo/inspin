import type { IUserState } from '@inspin/interfaces'
import { observable } from '@legendapp/state'

interface UserState {
  data: IUserState | null
}

const $state = observable<UserState>({
  data: null,
})

export const stateUser = {
  $state,

  setData: (data: IUserState) => {
    $state.data.set(data)
  },

  getData: (): IUserState | null => {
    return $state.data.get()
  },
}
