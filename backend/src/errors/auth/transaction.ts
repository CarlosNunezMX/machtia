import { HttpError } from "../shared/Error";

export class BurnedTransactionError extends HttpError {
    constructor() {
        super(401, "Transaction was burned!")
    }
}
export class MaxAllowedTransactionError extends HttpError {
    constructor() {
        super(400, "Max allowed active transaction reached!")
    }
}
export class TransactionTypeMissmatch extends HttpError {
    constructor() {
        super(401, "Transaction type missmatch!")
    }
}

export class ExpiratedTransaction extends HttpError {
    constructor() {
        super(401, "Transaction is expirated")
    }
}