import { TodoContext } from "./chat";

const fileNameRegex = /^\.(\/[^ ]+)*\.[a-zA-Z]+(-|:)/;

export async function findTodos() {
  const grepSearch = Bun.spawn([
    "grep",
    "-r",
    "-i",
    "-A 5",
    "-B 5",
    "todo",
    ".",
  ]);

  // const grepSearch = Bun.spawn([
  //   "grep",
  //   "-i",
  //   "-A 5",
  //   "-B 5",
  //   "todo",
  //   "ticTacToeTestFile.js",
  // ]);
  const grepResult = await new Response(grepSearch.stdout).text();
  const todos = grepResult.split("--");

  const todoContexts: TodoContext[] = [];

  todos.forEach((todo) => {
    const todoLines = todo.split(/\r?\n/);
    let fileName = "";
    let todoCode = "";
    todoLines.map((line) => {
      if (!fileName) {
        const fileNameMatch = line.match(fileNameRegex);
        if (fileNameMatch != null) {
          const trimmedFileName = fileNameMatch[0].slice(0, -1);
          fileName += trimmedFileName;
        }
      }
      todoCode += line.replace(/^\.(\/.+)*\.[a-zA-Z]+(-|:)/, "");
    });
    // if (fileName) {
    if (fileName === "./ticTacToeTestFile.js") {
      todoContexts.push({
        filename: fileName,
        code: todoCode,
      });
    }
  });
  todoContexts.forEach((todo) => {
    console.log(todo);
  });
  return todoContexts;
}

// findTodos();
