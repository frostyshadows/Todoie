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

const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>
    </Layout>
  );
};

export function setupRoutes(app: Hono, todoMetadatas: TodoMetadata[]) {
  app.get("/app.css", serveStatic({ path: "static/app.css" }));
  app.get("/", (c) => {
    return c.html(<Top messages={todoMetadatas.map((todo) => todo.title)} />);
  });
}
