FROM node:20-alpine

# 安装 libsql 依赖
RUN apk add --no-cache \
    build-base \
    python3 \
    sqlite \
    sqlite-dev

WORKDIR /app

# 复制 package.json 和 yarn.lock
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN yarn build
RUN yarn build:mastra

# 设置环境变量
ENV NODE_ENV=production
# LibSQL 环境变量将通过 docker-compose 或 docker run 命令传入

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["yarn", "start"]
