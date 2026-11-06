import { HttpError } from "../shared/Error";

export default class TokenMissmatchError extends HttpError {
    constructor(){
        super(401, "Token type missmatch!")
    }
}