import { AuthModels } from "@/dto/auth.model";
import Elysia from "elysia";

export const AuthRouter = new Elysia({ prefix: "/auth" })
  .post("/signIn", () => "ok!", {
    body: AuthModels.signIn,
    response: { 200: AuthModels.authSuccess }
  })
  .post("/signUp", () => "ok!", {
    body: AuthModels.signup,
    response: {
      200: AuthModels.authSuccess
    }
  })
