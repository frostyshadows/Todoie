import { Hono } from "hono";
import { TodoContext, TodoMetadata, generateMetadata } from "./chat";
import { setupRoutes } from "./routes";
import { findTodos } from "./grep";

// const todoContexts: TodoContext[] = [
//   {
//     filename: "app.tsx",
//     code: `// TODO: https://app.asana.com/id/78023489
// // Implement the final prompt
// const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: prompt }],
//     model: "gpt-3.5-turbo",
//   });`,
//   },
// ];
const todoMetadata: TodoMetadata[] = [];
if (!process.env.FRONTEND) {
  const todoContexts: TodoContext[] = await findTodos();
  for (const context of todoContexts.slice(0, 2)) {
    const metadata = await generateMetadata(context);
    todoMetadata.push(metadata);
  }
} else {
  console.log("Running in frontend-only mode...");
  todoMetadata.push({
    title:
      "Sint ea deserunt anim incididunt ad officia ullamco amet amet id veniam est excepteur.",
    description: `Exercitation incididunt magna irure minim nostrud anim minim occaecat quis ullamco. Ea quis aliqua ipsum occaecat et fugiat sint duis id. Elit elit commodo consectetur ea. Amet fugiat exercitation est. Dolor irure fugiat et quis tempor reprehenderit aliquip nulla officia mollit exercitation.

    Eu ea in esse. Quis occaecat sunt sunt dolor elit anim magna consequat. Commodo velit sint minim sit eu est id. Magna amet laborum Lorem do consequat. Dolore incididunt laborum deserunt do officia Lorem dolore ex anim est duis amet amet in. Enim est excepteur Lorem Lorem reprehenderit tempor fugiat deserunt ex.
    
    Elit ipsum excepteur culpa elit proident amet labore ea est tempor sint ullamco consectetur. Mollit nostrud labore anim culpa tempor sit proident velit commodo enim ut consequat tempor id. Dolore aliqua voluptate qui irure minim et. Elit veniam qui et irure pariatur et ipsum minim aliqua excepteur nulla officia ad. Nulla proident enim Lorem velit do nisi consequat tempor aute fugiat. Ad occaecat enim sunt pariatur. Pariatur veniam veniam non labore laboris occaecat in proident aute voluptate ullamco.`,
    tags: ["feature"],
    link: "https://app.asana.com/id/78023489",
    context_object: "const chatCompletion",
    filename: "app.tsx",
    code: `// TODO: https://app.asana.com/id/78023489`,
  });
  todoMetadata.push({
    title:
      "Tempor quis ullamco id eu ea duis esse aute tempor incididunt occaecat incididunt. Cupidatat laboris labore deserunt officia aute anim.",
    description: `Cillum ipsum irure fugiat dolore excepteur. Sit sunt officia cillum id ea ipsum tempor id eu ipsum veniam amet. Commodo id deserunt dolore magna sint occaecat est. Reprehenderit ad aliqua enim consequat deserunt anim ea enim. Lorem adipisicing esse dolor esse dolore enim reprehenderit duis ipsum ut Lorem et ullamco irure veniam.

    Occaecat dolor proident laboris pariatur ut cupidatat laborum officia consequat cupidatat ullamco. Proident veniam aute aliqua laboris aliqua amet aliquip enim nulla do incididunt do labore ipsum ipsum. Mollit eiusmod Lorem amet ullamco. Eu sunt eu cillum magna consequat adipisicing culpa esse duis officia enim minim. Adipisicing reprehenderit est aliqua commodo elit veniam Lorem. Magna tempor amet ipsum veniam laboris id ipsum esse.
    
    Tempor consectetur ullamco nostrud aute duis exercitation. Ullamco incididunt minim voluptate nulla est amet amet duis incididunt est sunt eiusmod. Consectetur cupidatat dolore amet elit amet nisi est aute quis mollit laborum fugiat. Proident occaecat cupidatat tempor elit ad ex occaecat. Non incididunt dolor cupidatat consectetur enim mollit exercitation nulla.`,
    tags: [],
    link: "",
    context_object: "",
    filename: "",
    code: ``,
  });
}

const app = new Hono();
setupRoutes(app, todoMetadata);
console.log("Ready!");

export default app;
