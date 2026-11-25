import { AuthModels } from "@dto/auth.model";
import Elysia from "elysia";
import { authService } from "services/auth";

export const AuthRouter = new Elysia({ prefix: "/auth" }).post(
  "/signIn",
  ({ body }) => authService.login(body),
  {
    body: AuthModels.signIn,
    response: { 200: AuthModels.authSuccess },
    detail: { summary: "Sign In endpoint." },
  },
);
