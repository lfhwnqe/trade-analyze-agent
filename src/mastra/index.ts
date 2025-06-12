import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
// import { weatherWorkflow } from "./workflows/weather-workflow";
import { storytellingAgent } from "./agents/storyAgent";

export const mastra = new Mastra({
  // workflows: { weatherWorkflow },
  agents: { storytellingAgent },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
