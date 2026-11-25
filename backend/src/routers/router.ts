import Elysia, { t } from "elysia";
import { openapi } from "@elysia/openapi";
import { AuthRouter } from "./auth.router";
import { HttpError } from "errors/shared/Error";

export const MainRouter = new Elysia()
  .error({ HttpError })
  .onError(({ error, status }) => {
    if (error instanceof HttpError) return status(error.status, error.message);
    console.log(error);
    return status(500, "Unknown error");
  })
  .use(openapi())
  .use(AuthRouter)
  .get(
    "/ping",
    { pong: true },
    {
      detail: {
        summary: "Pings the server",
        description: "Pings the server to check if it is alive or dead!",
      },
      response: t.Object({
        pong: t.Boolean({
          description: "Everytime expect true as the response.",
        }),
      }),
    },
  )