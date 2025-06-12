This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## LibSQL 配置

本项目使用 LibSQL 作为数据存储。您可以通过以下方式配置 LibSQL：

### 环境变量配置

在项目根目录创建 `.env` 文件（参考 `env.example`），配置以下环境变量：

```
# LibSQL 配置
LIBSQL_URL=http://localhost:8080  # LibSQL 服务地址
LIBSQL_AUTH_TOKEN=               # 认证令牌（如果需要）
```

### 启动 LibSQL 服务

项目提供了多种方式来启动不同的 LibSQL Docker 镜像：

#### 使用 npm/yarn 脚本（推荐）

1. 启动本地开发环境的 LibSQL 服务：

```bash
# 仅启动 LibSQL 服务（端口 8080）
yarn libsql:local

# 或者同时启动 LibSQL 服务和开发服务器
yarn dev:local
```

2. 启动 Turso 兼容环境的 LibSQL 服务：

```bash
# 仅启动 LibSQL 服务（端口 8081）
yarn libsql:turso

# 或者同时启动 LibSQL 服务和开发服务器
yarn dev:turso
```

#### 直接使用脚本

您也可以直接运行脚本：

1. 本地开发环境：

```bash
# 启动本地 LibSQL 服务（端口 8080）
./scripts/start-libsql-local.sh
```

2. Turso 兼容环境：

```bash
# 启动 Turso 兼容的 LibSQL 服务（端口 8081）
./scripts/start-libsql-turso.sh
```

### 切换环境

要在不同的 LibSQL 环境之间切换，只需修改 `.env` 文件中的环境变量：

```
# 本地开发环境
LIBSQL_URL=http://localhost:8080
LIBSQL_AUTH_TOKEN=

# 或者 Turso 兼容环境
# LIBSQL_URL=http://localhost:8081
# LIBSQL_AUTH_TOKEN=your_auth_token_here

# 或者 Turso 云服务
# LIBSQL_URL=https://your-database-name.turso.io
# LIBSQL_AUTH_TOKEN=your_turso_auth_token_here
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
