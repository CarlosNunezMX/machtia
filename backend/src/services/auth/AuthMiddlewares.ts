import Elysia from "elysia";
import { jwt } from ".";
import { IUserRepo } from "infrastructure/user/IUserRepo";
import { AuthError } from "errors/auth/AuthError";

export const AuthMiddlewares = (userRepo: IUserRepo) => new Elysia()
    .macro({
        hasSession: {
            async resolve({ headers, status }) {
                if (!headers["authorization"]) return status(401, new AuthError("MISSING_HEADER"));
                const token = headers["authorization"].replace("Bearer", "").trim();
                if (!token) return status(401, new AuthError("MISSING_TOKEN"));
                const valid = jwt.decode(token, "session");
                const user = await userRepo.getByUuid(valid.userUuid);
                return { user: { ...user, password: undefined } }
            }
        }
    })