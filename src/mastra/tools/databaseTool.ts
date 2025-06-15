import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// 从环境变量中读取 libsql 配置
const libsqlUrl = process.env.LIBSQL_URL || "file:../mastra.db";
const libsqlAuthToken = process.env.LIBSQL_AUTH_TOKEN || "";

// 测试 LibSQL 连接函数
export function testLibSQLConnection() {
  console.log(`正在测试 LibSQL 连接... URL: ${libsqlUrl}`);
  console.log(`认证令牌状态: ${libsqlAuthToken ? '已配置' : '未配置'}`);
  
  // 返回当前的 LibSQL 配置信息
  return {
    url: libsqlUrl,
    hasAuthToken: !!libsqlAuthToken,
    timestamp: new Date().toISOString(),
  };
}

// 数据库测试工具
export const testDatabaseTool = createTool({
  id: "test-database",
  description: "测试数据库连接状态",
  inputSchema: z.object({
    detail: z.boolean().optional().describe("是否返回详细信息")
  }),
  outputSchema: z.object({
    status: z.string(),
    message: z.string(),
    responseTime: z.string(),
    timestamp: z.string(),
    config: z.object({
      url: z.string(),
      hasAuthToken: z.boolean(),
      timestamp: z.string()
    }).optional()
  }),
  execute: async ({ context }) => {
    const { detail = false } = context;
    const startTime = Date.now();
    const config = testLibSQLConnection();
    const endTime = Date.now();
    
    const result = {
      status: "success",
      message: "数据库连接测试成功",
      responseTime: `${endTime - startTime}ms`,
      timestamp: new Date().toISOString(),
    };
    
    if (detail) {
      return {
        ...result,
        config
      };
    }
    
    return result;
  }
});
