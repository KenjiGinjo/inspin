export enum EnumErrorLogType {
  ApplicationError = 1,
  DatabaseError = 2,
  ThirdPartyPay = 3,
}

export enum EnumUserStatus {
  Active = 1,
  Blocked = 2,
  DeletePending = 3,
}

export enum EnumAdminStatus {
  Active = 0,
  Blocked = 1,
}

export enum EnumGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum EnumCharacterStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export enum EnumCharacterVoteStatus {
  Inactive = 'inactive',
  Active = 'active',
  Ended = 'ended',
}

export enum EnumCharacterCrowdfundingStatus {
  Inactive = 'inactive',
  Active = 'active',
  SuccessPending = 'success_pending',
  Failed = 'failed',
  Ended = 'ended',
}

export enum EnumCharacterSaleStatus {
  Inactive = 'inactive',
  Active = 'active',
}

export enum EnumExtraInfoTargetType {
  Character = 'character',
}

export enum EnumCharacterCrowdfundingSupportStatus {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
  Canceled = 'canceled',
}

export enum EnumPayMethod {
  Stripe = 'stripe',
  PayPal = 'paypal',
}

export enum EnumPayIntentType {
  CrowdfundingSupport = 'crowdfunding_support',
  Figurine = 'figurine',
}

export enum EnumRaffleStatus {
  Inactive = 'inactive',
  Active = 'active',
}

export enum EnumRaffleTargetType {
  FigurineSpecId = 'figurine_spec_id',
}

export enum EnumCharacterSaleOrderStatus {
  Unpaid = 'unpaid', // 待支付
  Undelivered = 'undelivered', // 待发货
  Unreceived = 'unreceived', // 待收货
  Uncommented = 'uncommented', // 待评价
  Completed = 'completed', // 已完成
  Cancelled = 'cancelled', // 已取消
  Refunding = 'refunding', // 退款中
  Refunded = 'refunded', // 已退款
}

export enum EnumUserAddressPageFrom {
  Checkout = 'checkout',
  Raffle = 'raffle',
}

export enum EnumArticleType {
  FAQ = 'faq',
}
