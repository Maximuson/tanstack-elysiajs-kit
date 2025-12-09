import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { serverInfoController } from "./server-info/infrastructure/ServerInfoController";
import { userController } from "./user/infrastructure/UserController";

const app = new Elysia()
  .use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  )
  .group("/api", (app) => app.use(serverInfoController).use(userController))
  .listen(process.env.PORT || 4000);

console.log(
  `🦊 Elysia backend running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
