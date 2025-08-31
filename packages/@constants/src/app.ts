import { EnumCharacterCrowdfundingStatus } from '@inspin/enums'

export const APP = {
  appName: 'BAIKAI',
  appStartDate: '2025-07-30',
  defaultTZ: '+08:00',
  currency: 'USD',
  currencySymbol: '$',
}

export const DEFAULT_IMAGE_LIMIT_SIZE = 2 * 1024 * 1024
export const DEFAULT_IMAGE_LIMIT_TYPE = ['png', 'jpeg']
export const DEFAULT_IMAGE_COMPRESS_QUALITY = 85

export const GENRE_OPTIONS = [
  {
    label: 'All',
    value: undefined,
  },
  {
    label: 'Manga',
    value: 'Manga',
  },
  {
    label: 'Western',
    value: 'Western',
  },
  {
    label: 'Anime',
    value: 'Anime',
  },
  {
    label: 'Doujinshi',
    value: 'Doujinshi',
  },
] as const

export const ORDER_BY_OPTIONS = [{
  label: 'Latest',
  value: 'latest',
}, {
  label: 'Most View',
  value: 'mostView',
}] as const

export const CROWDFUNDING_STATUS_OPTIONS = [{
  label: 'All',
  value: undefined,
}, {
  label: 'Active',
  value: EnumCharacterCrowdfundingStatus.Active,
}, {
  label: 'Success Pending',
  value: EnumCharacterCrowdfundingStatus.SuccessPending,
}, {
  label: 'Failed',
  value: EnumCharacterCrowdfundingStatus.Failed,
}, {
  label: 'Ended',
  value: EnumCharacterCrowdfundingStatus.Ended,
}] as const
