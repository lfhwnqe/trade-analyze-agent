// 导出所有工具
export { testDatabaseTool, testLibSQLConnection } from './databaseTool';
export { testMemoryTool, memory } from './memoryTool';
export { testApiTool } from './apiTool';
export { testSystemTool } from './systemTool';

// 导出测试工具调用示例函数
export async function runTestTools(agent: any) {
  console.log("开始测试工具调用...");
  
  try {
    // 测试数据库连接
    console.log("\n1. 测试数据库连接:");
    const dbTestResult = await agent.invoke({
      messages: [{ role: "user", content: "测试数据库连接并显示详细信息" }]
    });
    console.log("数据库测试结果:", dbTestResult);
    
    // 测试内存存储
    console.log("\n2. 测试内存存储:");
    const memoryStoreResult = await agent.invoke({
      messages: [{ role: "user", content: "在内存中存储键 'test-key' 的值为 'test-value'" }]
    });
    console.log("内存存储结果:", memoryStoreResult);
    
    // 测试内存检索
    console.log("\n3. 测试内存检索:");
    const memoryRetrieveResult = await agent.invoke({
      messages: [{ role: "user", content: "从内存中检索键 'test-key' 的值" }]
    });
    console.log("内存检索结果:", memoryRetrieveResult);
    
    // 测试系统信息
    console.log("\n4. 测试系统信息:");
    const systemInfoResult = await agent.invoke({
      messages: [{ role: "user", content: "获取系统信息" }]
    });
    console.log("系统信息结果:", systemInfoResult);
    
    console.log("\n所有测试工具调用完成!");
    return {
      status: "success",
      message: "所有测试工具调用成功完成",
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("测试工具调用失败:", error);
    return {
      status: "error",
      message: `测试工具调用失败: ${error instanceof Error ? error.message : String(error)}`,
      timestamp: new Date().toISOString()
    };
  }
}
