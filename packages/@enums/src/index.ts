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

export enum EnumTodoStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum EnumUserTodoStatus {
  Pending = 'pending',
  Finished = 'finished',
  Failed = 'failed',
}

export enum EnumExtraInfoTargetType {
  Default = 'default',
}
