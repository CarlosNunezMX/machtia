import { HttpError } from "../shared/Error";

export class UserExistsError extends HttpError {
  constructor() {
    super(302, "Cannot sign up! User already exists!");
  }
}
