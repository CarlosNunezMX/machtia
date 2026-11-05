export default class NotFoundError extends Error {
    constructor() {
        super("The requested resource was not found!")
    }
}