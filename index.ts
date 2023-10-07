import { Hono } from "hono";
import { setupRoutes } from "./routes";
import { TodoContext, TodoMetadata, generateMetadata } from "./chat";

const todoContexts: TodoContext[] = [
  {
    filename: "app.tsx",
    code: `// TODO: app.asana.com/id/78023489
// Implement the final prompt
const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });`,
  },
];
const todoMetadata: TodoMetadata[] = [];
for (const context of todoContexts) {
  const metadata = await generateMetadata(context);
  todoMetadata.push(metadata);
}

const app = new Hono();
setupRoutes(app, todoMetadata);
console.log("Ready!");

export default app;
