import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// API 测试工具
export const testApiTool = createTool({
  id: "test-api",
  description: "测试 API 端点响应",
  inputSchema: z.object({
    url: z.string().describe("要测试的 API URL"),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"])
      .default("GET")
      .describe("HTTP 方法（GET, POST, PUT, DELETE 等）"),
    headers: z.record(z.string()).optional().describe("请求头"),
    body: z.any().optional().describe("请求体（用于 POST, PUT 等方法）"),
    timeout: z.number().default(5000).describe("请求超时时间（毫秒）")
  }),
  outputSchema: z.object({
    status: z.string(),
    statusCode: z.number().optional(),
    statusText: z.string().optional(),
    responseTime: z.string().optional(),
    headers: z.record(z.string()).optional(),
    data: z.any().optional(),
    message: z.string().optional(),
    timestamp: z.string()
  }),
  execute: async ({ context }) => {
    try {
      const { url, method = "GET", headers = {}, body, timeout = 5000 } = context;
      const startTime = Date.now();
      
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        signal: AbortSignal.timeout(timeout)
      };
      
      if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
        options.body = JSON.stringify(body);
      }
      
      const response = await fetch(url, options);
      const endTime = Date.now();
      
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      
      return {
        status: "success",
        statusCode: response.status,
        statusText: response.statusText,
        responseTime: `${endTime - startTime}ms`,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: "error",
        message: `API 请求失败: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString()
      };
    }
  }
});
