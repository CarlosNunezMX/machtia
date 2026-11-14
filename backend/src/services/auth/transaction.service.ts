import { MaxAllowedTransactionError } from "@errors/auth/transaction";
import { ITransactionRepo } from "@infrastructure/auth/ITransactionRepo";
import { IUserRepo } from "@infrastructure/user/IUserRepo";
import { TokenType } from "@models/token";
import { Transaction } from "@models/transaction";
import { User } from "@models/user";

export class TransactionService  {
    constructor(
        private userRepo: IUserRepo,
        private transactionRepo: ITransactionRepo,
        private expirations: Record<TokenType, number>
    ) { }

    async generate(user: User, type: TokenType): Promise<Transaction> {
        // get all transactions of this type and check if
        // user has not more than 3 events

        const transactions = await this.transactionRepo.getAll(user, type, false);
        if (transactions.length > 3) throw new MaxAllowedTransactionError();

        const exp = new Date(new Date().getTime() + this.expirations[type]);
        const transaction = this.transactionRepo.create(user, type, exp);

        return transaction;
    }
}