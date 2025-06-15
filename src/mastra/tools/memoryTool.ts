import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";

// 从环境变量中读取 libsql 配置
const libsqlUrl = process.env.LIBSQL_URL || "file:../mastra.db";
const libsqlAuthToken = process.env.LIBSQL_AUTH_TOKEN || "";

// 初始化 memory 与 LibSQLStore
export const memory = new Memory({
  storage: new LibSQLStore({
    url: libsqlUrl,
    authToken: libsqlAuthToken || undefined,
  }),
  vector: new LibSQLVector({
    connectionUrl: libsqlUrl,
    authToken: libsqlAuthToken || undefined,
  }),
});

// 内存存储工具
export const testMemoryTool = createTool({
  id: "test-memory",
  description: "测试内存存储和检索功能",
  inputSchema: z.object({
    key: z.string().describe("要存储或检索的键名"),
    value: z.string().optional().describe("要存储的值（如果不提供则为检索操作）")
  }),
  outputSchema: z.object({
    status: z.string(),
    operation: z.string(),
    message: z.string().optional(),
    key: z.string().optional(),
    value: z.any().optional(),
    timestamp: z.string()
  }),
  execute: async ({ context }) => {
    try {
      const { key, value } = context;
      
      // 如果提供了值，则为存储操作
      if (value !== undefined) {
        await memory.storage.set(key, value);
        return {
          status: "success",
          operation: "store",
          message: `成功存储键 "${key}" 的值`,
          timestamp: new Date().toISOString()
        };
      } 
      // 否则为检索操作
      else {
        const storedValue = await memory.storage.get(key);
        return {
          status: "success",
          operation: "retrieve",
          key,
          value: storedValue,
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      return {
        status: "error",
        operation: "error",
        message: `内存操作失败: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString()
      };
    }
  }
});
