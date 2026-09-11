# Inspin

每周三个小冒险，鼓励去实践。这是一套可本地跑起来的全栈示例：**pnpm monorepo + Hono API + orchid-orm + React (Vite)**。

适合对照学习：共享类型、从 Hono 路由生成 ts-rest contract、分层数据访问、前端 Query + 鉴权守卫。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 包管理 / 任务 | pnpm workspace、Turbo |
| 运行时 | Bun（API / DB 脚本） |
| API | Hono、Zod |
| 数据库 | PostgreSQL、orchid-orm（运行时） |
| 前端 | React 19、Vite、Wouter、TanStack Query、Legend State、Tailwind 4 |
| 契约 | `apps/api` 路由 → `packages/honojs` 解析 → `@inspin/contracts` |

## 仓库结构

```
apps/api          Hono 接口、JWT、校验
apps/db           表定义、repo、service、seed
apps/web-app      用户端 SPA
packages/@contracts     生成出的前后端契约（不要手改）
packages/@interfaces    共享 DTO / 响应类型
packages/@validations   共享 Zod schema
packages/@enums         枚举
packages/@constants     常量
packages/@tools         密码哈希、异常、日期等
packages/honojs         从 Hono 源码生成 contract
packages/request        前端请求封装
packages/ts-rest-react-query  ts-rest + react-query 胶水
```

更细的数据流见 [docs/architecture.md](docs/architecture.md)。

## 环境要求

- Node >= 18
- [pnpm](https://pnpm.io/) 9
- [Bun](https://bun.sh/)
- Docker（可选，用来起 Postgres）或本机 PostgreSQL

## 快速开始

```bash
pnpm install

# 1. 数据库
cp apps/db/.env.example apps/db/.env
docker compose up -d
# 把 apps/db/.env 里的 DATABASE_URL 指到 compose 里的库

# 2. API
cp apps/api/.env.example apps/api/.env
# 填写 JWT_SECRET（可用：node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"）
# DATABASE_URL 与 db 包一致

# 3. 前端
cp apps/web-app/.env.example apps/web-app/.env

# 4. 推表 + 种子（运行时表定义在 orchid，见 docs/architecture.md）
cd apps/db && bun run db:push && bun run db:seed && cd ../..

# 5. 开发
pnpm dev
```

默认：

- API：`http://localhost:10001`
- Web：`http://localhost:30003`

改完 `apps/api/src/http` 后重新生成前端契约：

```bash
cd apps/api && bun run gen:contract
```

## 常用命令

```bash
pnpm dev          # turbo 并行跑各包 dev
pnpm lint
pnpm check-types
pnpm build
```

`apps/db`：`db:push` / `db:seed` / `db:test`。  
`apps/api`、`apps/web-app` 里的 `scripts/build.ts`、`deploy.ts` 是个人服务器 scp 脚本，学习克隆不必使用。

## 学习路径（建议顺序）

1. `packages/@validations` + `packages/@interfaces`：共享约束怎么铺到两端  
2. `apps/api/src/http` + `packages/honojs`：路由怎么变成 contract  
3. `apps/db`：table → repo → service  
4. `apps/web-app/src/components/request` + `guard`：请求与登录态  
5. `apps/web-app/src/pages/home.tsx`：冒险主流程

## 许可证

[MIT](LICENSE)
