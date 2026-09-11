# 安全

不要把真实 `.env`、密钥、服务器密码提交进仓库。

示例文件：

- `apps/api/.env.example`
- `apps/db/.env.example`
- `apps/web-app/.env.example`

JWT 用足够长的随机串。生产环境不要用 compose 默认密码。

发现问题请开 Issue，不要公开完整利用细节。
