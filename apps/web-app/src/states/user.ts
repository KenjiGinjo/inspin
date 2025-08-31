import type { ResUserBase } from '@inspin/interfaces'
import { observable } from '@legendapp/state'

interface UserState {
  data: ResUserBase | null
}

const $state = observable<UserState>({
  data: null,
})

export const stateUser = {
  $state,

  setData: (data: ResUserBase) => {
    $state.data.set(data)
  },

  getData: (): ResUserBase | null => {
    return $state.data.get()
  },
}
