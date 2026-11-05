export class PasswordMissmatchError extends Error {
    constructor() {
        super("Password does not match!")
    }
}