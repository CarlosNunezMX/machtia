import { HttpError } from "./shared/Error";

export default class NotFoundError extends HttpError {
  constructor() {
    super(404, "The requested resource was not found!");
  }
}
