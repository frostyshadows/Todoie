import OpenAI from "openai";

interface TodoMetadata {
  title: string;
  description: string;
  tags: string[];
  link: string;
  context_object: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TODOIE_API_KEY,
});

const prompt = `You are a talented senior software engineer. You have left a series of TODOs in your codebase and now you want to display them in a helpful, intuitive UI.
What follows is a single TODO and its surrounding context. Parse the TODO and its surrounding context. Some of the things you should look for include:
- Any links to services like Jira, Github, or Asana.
- Tags like "bug" or "feature"
- Explanatory context like a comment or description
- The names of any relevant objects in the context, like a function name or class name

Make up a title for the TODO based on the metadata and output a single JSON object with the fields title, description, tags, link, and context_object. Tags cannot be null, but the other fields can be null.
Do not include other fields.

Example input:

\`\`\`
    return null;
}

// example.org/123456
// TODO (bug): Fix time offset bug for AU
// These times are calculated incorrectly in Australian timezones; we should fix it

function calculateTimezoneOffset() {

\`\`\`

Example output:

\`\`\`
{
    "title": "Fix time offset bug for AU",
    "description": "These times are calculated incorrectly in Australian timezones; we should fix it",
    "tags": ["bug"],
    "link": "example.org/123456",
    "context_object": "function calculateTimezoneOffset()"
}
\`\`\`

You must output valid JSON. The TODO to analyze follows:\n\n

\`\`\`
// TODO: app.asana.com/id/78023489
// Implement the final prompt
const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
\`\`\`
`;

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: "user", content: prompt }],
  model: "gpt-3.5-turbo",
});

const message = chatCompletion.choices[0].message;
if (!message.content) {
  process.exit(1);
}

const todoMetadata: TodoMetadata = JSON.parse(message.content) as TodoMetadata;
console.log(`${JSON.stringify(todoMetadata, null, 2)}`);
