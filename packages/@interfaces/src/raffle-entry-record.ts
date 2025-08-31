export interface ResRaffleEntryRecord {
  id: string
  isWin: boolean

  isDistribute: boolean
  distributeAt: string | null

  userId: string
  raffleId: string
  targetId: string
  targetType: string

  userAddressId: string | null
  remark: string | null
}
