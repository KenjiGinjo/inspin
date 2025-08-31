export interface ResUserBase {
  id: string
  profile: {
    nickname: string | null
    avatar: string | null
  }
}

export interface ResUserProfile {
  id: string
  nickname: string | null
  avatar: string | null
  bio: string
  userId: string

  createdAt: string
  updatedAt: string
}
