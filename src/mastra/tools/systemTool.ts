import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// 系统信息测试工具
export const testSystemTool = createTool({
  id: "test-system",
  description: "获取系统信息和环境变量",
  inputSchema: z.object({
    includeEnv: z.boolean().default(false).describe("是否包含环境变量信息（敏感信息会被过滤）")
  }),
  outputSchema: z.object({
    platform: z.string(),
    nodeVersion: z.string(),
    uptime: z.number(),
    memoryUsage: z.record(z.number()),
    cpuUsage: z.record(z.number()),
    timestamp: z.string(),
    env: z.record(z.string()).optional()
  }),
  execute: async ({ context }) => {
    const { includeEnv = false } = context;
    
    const systemInfo: any = {
      platform: process.platform,
      nodeVersion: process.version,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      timestamp: new Date().toISOString()
    };
    
    if (includeEnv) {
      // 过滤敏感环境变量
      const safeEnv = { ...process.env };
      const sensitiveKeys = ["API_KEY", "SECRET", "PASSWORD", "TOKEN", "AUTH", "CREDENTIAL"];
      
      for (const key of Object.keys(safeEnv)) {
        if (sensitiveKeys.some(sensitive => key.toUpperCase().includes(sensitive))) {
          safeEnv[key] = "[REDACTED]";
        }
      }
      
      systemInfo.env = safeEnv;
    }
    
    return systemInfo;
  }
});
