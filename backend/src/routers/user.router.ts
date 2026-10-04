import { userModels } from "@/dto/user.model";
import Elysia from "elysia";

export const UserRouter = new Elysia({ prefix: "/auth" })
  .post("/signin", () => "ok!", {body: userModels.signIn, });
