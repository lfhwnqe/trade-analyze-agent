#!/bin/bash

# 启动 Turso 兼容的 libsql docker 镜像 - 生产环境 (8081端口)
echo "启动生产环境 Turso 兼容的 libsql 服务..."

# 创建生产环境数据目录（如果不存在）
mkdir -p /Users/linuo/database/libsql-production

# 停止并删除已存在的容器（如果有）
docker stop libsql-turso 2>/dev/null || true
docker rm libsql-turso 2>/dev/null || true

# 启动 libsql Turso 兼容容器
docker run -d \
  --name libsql-turso \
  -p 8081:8080 \
  -v "/Users/linuo/database/libsql-production:/data" \
  ghcr.io/tursodatabase/libsql-server:latest \
  sqld --db-path /data/mastra-production.db \
  --http-listen-addr 0.0.0.0:8081 \
  --enable-turso-auth

echo "生产环境 Turso 兼容的 libsql 服务已启动，地址: http://localhost:8081"
echo "请在 .env.production 文件中设置:"
echo "LIBSQL_URL=http://localhost:8081"
echo "LIBSQL_AUTH_TOKEN=your_auth_token_here"
echo "注意：这是生产环境数据库，数据存储在 /Users/linuo/database/libsql-production 目录"
