#!/bin/bash

# 启动本地 libsql docker 镜像 - 本地开发环境 (8080端口)
echo "启动本地开发环境 libsql 服务..."

# 创建本地开发环境数据目录（如果不存在）
mkdir -p /Users/linuo/database/libsql-local

# 停止并删除已存在的容器（如果有）
docker stop libsql-local 2>/dev/null || true
docker rm libsql-local 2>/dev/null || true

# 启动 libsql 本地开发容器
docker run -d \
  --name libsql-local \
  -p 8080:8080 \
  -v "/Users/linuo/database/libsql-local:/data" \
  ghcr.io/tursodatabase/libsql-server:latest \
  sqld --db-path /data/mastra-local.db --http-listen-addr 0.0.0.0:8080

echo "本地开发环境 libsql 服务已启动，地址: http://localhost:8080"
echo "请在 .env 文件中设置:"
echo "LIBSQL_URL=http://localhost:8080"
echo "LIBSQL_AUTH_TOKEN="
echo "注意：这是本地开发环境数据库，数据存储在 /Users/linuo/database/libsql-local 目录"
