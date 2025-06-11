import { Agent } from "@mastra/core";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openRouterApiKey = process.env.OPENROUTER_API_KEY;
const openrouter = createOpenRouter({
  apiKey: openRouterApiKey,
});

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
});
