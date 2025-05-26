import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./api";
import { createContext } from "./api/context";

const app = new Hono();

app.use(
  "/trpc/*",
  cors({
    origin: ["http://localhost:5173"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
    onError: ({
      error,
      path = "unknown",
      type,
    }: {
      error: Error;
      path?: string;
      type: string;
      ctx: Context;
      input: unknown;
      req: Request;
    }) => {
      console.error(`tRPC error on ${path} (${type}):`, error);
    },
  })
);

app.get("/", (c) => c.text("MobileMart Backend API is running!"));

console.log("Backend server starting on http://localhost:3000");

export default {
  port: 3000,
  fetch: app.fetch,
};
