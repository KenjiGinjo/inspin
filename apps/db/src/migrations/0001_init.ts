import { change } from '../db-script'

change(async (db) => {
  await db.createTable('__cache', t => ({
    key: t.varchar().primaryKey(),
    value: t.text(),
    expiresAt: t.timestamp().nullable(),
  }))

  await db.createTable('user', t => ({
    ...t.baseColumns(),
    username: t.string().nullable(),
    password: t.string().nullable(),
    email: t.string().nullable(),
    emailVerifiedAt: t.xTimestamp().nullable(),
    phone: t.string().nullable(),
    phoneVerifiedAt: t.xTimestamp().nullable(),
    status: t.xEnum({}).hasDefault(),
    diamond: t.integer().hasDefault(),
    voteToken: t.integer().hasDefault(),
  }))

  await db.createTable('admin', t => ({
    ...t.baseColumns(),
    username: t.string().unique(),
    password: t.string(),
    role: t.json().default([]),
    status: t.xEnum({}).hasDefault(),
    nickname: t.string().nullable(),
    avatar: t.string().nullable(),
    phone: t.string().nullable(),
    email: t.string().nullable(),
  }))

  await db.createTable('profile', t => ({
    ...t.baseColumns(),
    nickname: t.string().nullable(),
    avatar: t.string().nullable(),
    bio: t.string().hasDefault(),
    userId: t.cuid().unique().foreignKey('user', 'id'),
  }))

  await db.createTable('session', t => ({
    id: t.cuid().primaryKey(),
    userId: t.cuid().foreignKey('user', 'id'),
    expireAt: t.xTimestamp(),
    createdAt: t.createdAt(),
    payload: t.json().hasDefault(),
  }))

  await db.createTable('error_log', t => ({
    id: t.cuid().primaryKey(),
    createdAt: t.createdAt(),
    type: t.xEnum({}),
    code: t.string(),
    detail: t.text(),
    path: t.text().nullable(),
    method: t.string().nullable(),
    query: t.json().nullable(),
    body: t.json().nullable(),
    headers: t.json().nullable(),
    stack: t.text().nullable(),
  }))

  await db.createTable('extra_info', t => ({
    ...t.baseColumns(),
    targetId: t.string(),
    targetType: t.xEnumString({}),
    content: t.text(),
    payload: t.json().hasDefault(),
    userId: t.string().foreignKey('user', 'id'),
  }))

  await db.createTable('todo', t => ({
    ...t.baseColumns(),
    deletedAt: t.xTimestamp().nullable(),
    description: t.string(),
    category: t.string(),
    status: t.xEnumString({}),
  }))

  await db.createTable('user_todo', t => ({
    ...t.baseColumns(),
    deletedAt: t.xTimestamp().nullable(),
    finishedAt: t.xTimestamp().nullable(),
    failedAt: t.xTimestamp().nullable(),
    description: t.string(),
    category: t.string(),
    status: t.xEnumString({}),
    userId: t.string().index(),
    todoId: t.string(),
  }))

  await db.createTable('tip', t => ({
    ...t.baseColumns(),
    deletedAt: t.xTimestamp().nullable(),
    content: t.string(),
  }))
})
