import { HttpError } from "errors/shared/Error";

export class AuthError extends HttpError {
    constructor(message: string) {
        super(401, message);
    }
}