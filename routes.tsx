/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { TodoMetadata } from "./chat";
import { serveStatic } from "hono/bun";

export interface Config {
  repo: string;
  githubToken: string;
}

const GithubIcon: FC<{}> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      class="GithubIcon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const Todo: FC<{ todo: TodoMetadata }> = (props: { todo: TodoMetadata }) => {
  return (
    <li class="TodoItem">
      <div class="TodoContent">
        <h2>TODO: {props.todo.title}</h2>
        <p>
          <b>Description:</b> {props.todo.description}
        </p>
        {props.todo.link.length !== 0 && (
          <p>
            <b>Link:</b> <a href={props.todo.link}>{props.todo.link}</a>
          </p>
        )}
        {props.todo.tags.length !== 0 && (
          <p>
            <b>Tags:</b> {props.todo.tags.join(", ")}
          </p>
        )}
        <p>
          <b>Related definition:</b> <code>{props.todo.context_object}</code>
        </p>
      </div>
      <GithubIcon />
    </li>
  );
};

const Page: FC<{ todos: TodoMetadata[] }> = (props: {
  todos: TodoMetadata[];
}) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="app.css" />
      </head>
      <body>
        <h1>Todoie</h1>
        <ul class="TodoList">
          {props.todos.map((todo) => {
            return <Todo todo={todo} />;
          })}
        </ul>
      </body>
    </html>
  );
};

export function setupRoutes(app: Hono, todoMetadatas: TodoMetadata[]) {
  app.get("/app.css", serveStatic({ path: "static/app.css" }));
  app.get("/", (c) => {
    return c.html(<Page todos={todoMetadatas} />);
  });
}
