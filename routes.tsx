/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { TodoMetadata } from "./chat";
import { serveStatic } from "hono/bun";

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="app.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};

const Todo: FC<{ todo: TodoMetadata }> = (props: { todo: TodoMetadata }) => {
  return (
    <li>
      <h2>{props.todo.title}</h2>
      <h3>{props.todo.description}</h3>
      <p>
        Link: <a href={props.todo.link}>{props.todo.link}</a>
      </p>
      <p>Tags: {props.todo.tags.join(", ")}</p>
      <p>
        Related definition: <code>{props.todo.context_object}</code>
      </p>
    </li>
  );
};

const Top: FC<{ todos: TodoMetadata[] }> = (props: {
  todos: TodoMetadata[];
}) => {
  return (
    <Layout>
      <h1>Todoie</h1>
      <ul>
        {props.todos.map((todo) => {
          return <Todo todo={todo} />;
        })}
      </ul>
    </Layout>
  );
};

export function setupRoutes(app: Hono, todoMetadatas: TodoMetadata[]) {
  app.get("/app.css", serveStatic({ path: "static/app.css" }));
  app.get("/", (c) => {
    return c.html(<Top todos={todoMetadatas} />);
  });
}
