import Elysia, { t } from "elysia";
import {
  openapi

} from "@elysia/openapi"

export const MainRouter = new Elysia()
  .use(openapi())
  .get("/ping",
    { pong: true },
    { detail: { summary: "Pings the server", description: "Pings the server to check if it is alive or dead!" }, response: t.Object({ pong: t.Boolean({ description: "Everytime expect true as the response." }) }) }
  )
  .get("/", { hello: "world" });