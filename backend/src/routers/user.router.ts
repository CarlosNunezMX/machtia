import { AuthModels } from "dto/auth.model";
import { UserModels } from "dto/user";
import Elysia from "elysia";
import { UserRepo } from "infrastructure/user";
import { AuthMiddlewares } from "services/auth/AuthMiddlewares";

export const UserRouter = new Elysia({ prefix: "/users" })
    .use(AuthMiddlewares(UserRepo))
    .get("/", ({ user }) => user, {
        hasSession: true,
        headers: AuthModels.authHeaders,
        response: { 200: UserModels.user }
    });
