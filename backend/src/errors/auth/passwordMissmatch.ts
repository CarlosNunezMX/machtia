import { HttpError } from "../shared/Error";

export class PasswordMissmatchError extends HttpError {
  constructor() {
    super(400, "Password does not match!");
  }
}
