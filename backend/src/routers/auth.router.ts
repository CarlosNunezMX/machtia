import { AuthModels } from "@/dto/auth.model";
import Elysia from "elysia";

export const AuthRouter = new Elysia({ prefix: "/auth" })
  .post("/login", () => "ok!", { body: AuthModels.signIn, response: { 200: AuthModels.loginResponse } });
