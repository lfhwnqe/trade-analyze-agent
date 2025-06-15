import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
// import { weatherWorkflow } from "./workflows/weather-workflow";
import { storytellingAgent } from "./agents/storyAgent";
import { testAgent } from "./agents/testAgent";

export const mastra = new Mastra({
  // workflows: { weatherWorkflow },
  agents: { storytellingAgent, testAgent },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
