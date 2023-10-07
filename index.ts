const proc = Bun.spawn(["grep", "-r", "-i", "todo", "."]);
const todos = await new Response(proc.stdout).text();
console.log(todos);
