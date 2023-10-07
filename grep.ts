const grepSearch = Bun.spawn(["grep", "-r", "-i", "-A 5", "-B 5", "todo", "."]);
const grepResult = await new Response(grepSearch.stdout).text();
const todos: string[] = grepResult.split(/\r?\n/).map(function (line) {
  return line.replace(/^\.(\/.+)*\.[a-zA-Z]+(-|:)/, "");
});
todos.forEach(function (todo) {
  console.log(todo);
});
