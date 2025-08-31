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
  Pending = 0,
  InProgress = 1,
  Completed = 2,
  Failed = 3,
}

export enum EnumExtraInfoTargetType {
  Default = 0,
}
