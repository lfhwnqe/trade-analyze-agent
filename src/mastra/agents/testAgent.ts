import { Agent } from "@mastra/core/agent";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  testDatabaseTool,
  testMemoryTool,
  testApiTool,
  testSystemTool,
  memory,
  runTestTools
} from "../tools";

// 从环境变量中读取 OpenRouter API 密钥
const openRouterApiKey = process.env.OPENROUTER_API_KEY;
const openrouter = createOpenRouter({
  apiKey: openRouterApiKey,
});

// 在创建 Agent 前输出 LibSQL 配置信息
console.log('正在初始化测试 Agent...');



// 创建测试 Agent
export const testAgent = new Agent({
  name: "Test Agent",
  instructions: `
      你是一个测试系统功能的专业助手。
      你的任务是帮助用户测试各种系统功能和接口。
      
      你应该能够：
      - 验证系统连接状态
      - 测试数据存储和检索功能
      - 检查 API 响应
      - 生成测试报告
      - 提供测试结果分析
      
      你可以使用以下工具：
      - test-database: 测试数据库连接状态
      - test-memory: 测试内存存储和检索功能
      - test-api: 测试 API 端点响应
      - test-system: 获取系统信息和环境变量
      
      请以清晰、专业的方式回应用户的测试请求，并提供详细的测试结果信息。
  `,
  model: openrouter.chat("deepseek/deepseek-chat-v3-0324:free"),
  memory,
  tools: {
    "test-database": testDatabaseTool,
    "test-memory": testMemoryTool,
    "test-api": testApiTool,
    "test-system": testSystemTool
  },
});

// 导出测试函数和 Agent，方便在其他地方调用
export { runTestTools };

