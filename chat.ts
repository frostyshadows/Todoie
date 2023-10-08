import OpenAI from "openai";

export interface TodoContext {
  filename: string;
  code: string;
}

export interface TodoMetadata {
  title: string;
  description: string;
  tags: string[];
  link: string;
  context_object: string;
  filename: string;
  code: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TODOIE_API_KEY,
});

function generatePrompt(todo: TodoContext): string {
  return `You are a talented senior software engineer. You have left a series of TODOs in your codebase and now you want to display them in a helpful, intuitive UI.
What follows is a single TODO and its surrounding context. Parse the TODO and its surrounding context. Some of the things you should look for include:
- Any links to services like Jira, Github, or Asana.
- Tags like "bug" or "feature"
- Explanatory context like a comment or description
- The names or usernames of software engineers
- The names of any relevant objects in the context, like a function name or class name

Make up a title for the TODO based on the metadata and output a single JSON object with the fields title, description, tags, link, and context_object. Tags cannot be null, but the other fields can be null.
Do not include other fields.

Example input:

\`\`\`
    return null;
}

// example.org/123456
// TODO (bug)(rwblickhan): Fix time offset bug for AU
// These times are calculated incorrectly in Australian timezones; we should fix it

function calculateTimezoneOffset() {

\`\`\`

Example output:

\`\`\`
{
    "title": "Fix time offset bug for AU",
    "description": "These times are calculated incorrectly in Australian timezones; we should fix it",
    "tags": ["bug"],
    "people": ["rwblickhan],
    "link": "example.org/123456",
    "context_object": "function calculateTimezoneOffset()"
}
\`\`\`

You must output valid JSON. The TODO to analyze comes from a file named ${todo.filename}. The TODO to analyze follows:\n\n

${todo.code}
`;
}

export async function generateMetadata(
  todo: TodoContext
): Promise<TodoMetadata> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: generatePrompt(todo) }],
    model: "gpt-3.5-turbo",
  });

  const message = chatCompletion.choices[0].message;
  if (!message.content) {
    process.exit(1);
  }

  return { ...JSON.parse(message.content), ...todo };
}
