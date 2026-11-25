import Elysia, { t } from "elysia";
import { openapi } from "@elysia/openapi";
import { AuthRouter } from "./auth.router";
import { HttpError } from "errors/shared/Error";
import { UserRouter } from "./user.router";

export const MainRouter = new Elysia()
  .error({ HttpError })
  .onError(({ error, status }) => {
    if (error instanceof HttpError) return status(error.status, error);
    console.log(error);
    return status(500, error);
  })
  .use(openapi())
  .use(AuthRouter)
  .use(UserRouter)
