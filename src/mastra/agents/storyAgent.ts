import { Agent } from "@mastra/core";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { Memory } from "@mastra/memory";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openRouterApiKey = process.env.OPENROUTER_API_KEY;
const openrouter = createOpenRouter({
  apiKey: openRouterApiKey,
});
// 从环境变量中读取 libsql 配置
const libsqlUrl = process.env.LIBSQL_URL || "file:../mastra.db";
const libsqlAuthToken = process.env.LIBSQL_AUTH_TOKEN || "";

// Initialize memory with LibSQLStore
const memory = new Memory({
  storage: new LibSQLStore({
    url: libsqlUrl,
    authToken: libsqlAuthToken || undefined,
  }),
  vector: new LibSQLVector({
    connectionUrl: libsqlUrl,
    authToken: libsqlAuthToken || undefined,
  }),
});

// 使用示例：测试 LibSQL 连接
function testLibSQLConnection() {
  console.log(`正在测试 LibSQL 连接... URL: ${libsqlUrl}`);
  console.log(`认证令牌状态: ${libsqlAuthToken ? '已配置' : '未配置'}`);
  
  // 返回当前的 LibSQL 配置信息
  return {
    url: libsqlUrl,
    hasAuthToken: !!libsqlAuthToken,
    timestamp: new Date().toISOString(),
  };
}

// 在创建 Agent 前测试 LibSQL 连接
const libsqlConfig = testLibSQLConnection();
console.log('LibSQL 配置信息:', libsqlConfig);

export const storytellingAgent = new Agent({
  name: "Storytelling Agent",
  instructions: `
      你是一个给小朋友讲故事的专家
      你的任务是根据小朋友的年龄和兴趣，给他们讲一个有趣的故事。
      你的故事应该包含以下元素：
      - 有趣的角色
      - 有趣的故事情节
      - 有趣的角色对话
      - 有趣的角色动作
      - 有趣的角色表情
`,
  model: openrouter.chat("deepseek/deepseek-chat-v3-0324:free"),
  memory,
});

// 导出测试函数，方便在其他地方调用
export { testLibSQLConnection };
