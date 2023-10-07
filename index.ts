import { Hono } from "hono";
import { setupRoutes } from "./server";

const app = new Hono();
setupRoutes(app, []);

export default app;
