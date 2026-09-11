# 参与

先把 [README](README.md) 的快速开始跑通，再改代码。

## 约定

- 共享类型放 `packages/@interfaces` / `@validations` / `@enums`，不要在 app 里复制一份。
- 改 API 路由后执行 `cd apps/api && bun run gen:contract`。
- 改表结构改 `apps/db/src/tables`，再视情况 `cd apps/db && bun run db:generate`。
- Lint：`pnpm lint`（`@antfu/eslint-config`）。

## PR

说明改了哪一层（http / db / web / packages）以及如何本地验证（登录、拉冒险、改资料等）。
