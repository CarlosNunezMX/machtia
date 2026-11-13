import { TokenType } from "@models/token";
import { Transaction } from "@models/transaction";
import { User } from "@models/user";
import { PrismaRepo } from "../shared/PrismaRepo";
import { ITransactionRepo } from "./ITransactionRepo";
import { NotFoundError } from "elysia";
import { BurnedTransactionError, ExpiratedTransaction, TransactionTypeMissmatch } from "@errors/auth/transaction";

export class TransactionPrismaRepo
  extends PrismaRepo
  implements ITransactionRepo {
  async create(
    user: User,
    type: TokenType,
    expiration: Date,
  ): Promise<Transaction> {
    const transaction = await this.client.orm.public.Transaction.create({
      state: false,
      targetUuid: user.uuid,
      type,
    });

    return new Transaction(
      transaction.uuid,
      transaction.targetUuid,
      transaction.type as TokenType,
      transaction.state,
      transaction.createdAt,
      transaction.expiration || undefined,
    );
  }

  async consume(uuid: string, type: TokenType): Promise<void> {
    const transaction = await this.client.orm.public.Transaction
      .where({ uuid }).first();
    if (!transaction) throw new NotFoundError();
    if (transaction.expiration && transaction.expiration > new Date())
      throw new ExpiratedTransaction()
    if (transaction.state) throw new BurnedTransactionError();
    if (transaction.type !== type) throw new TransactionTypeMissmatch();

    await this.client.orm.public.Transaction
      .where({ uuid })
      .update({ state: true });
  }

  async revoke(uuid: string): Promise<Transaction> {
    const transaction = await this.client.orm.public.Transaction
      .where({ uuid })
      .update({ state: true })
    if (!transaction) throw new NotFoundError();
    return new Transaction(
      transaction.uuid,
      transaction.targetUuid,
      transaction.type as TokenType,
      transaction.state,
      transaction.createdAt,
      transaction.expiration || undefined,
    )
  }

  async get(uuid: string): Promise<Transaction> {
    const transaction = await this.client.orm.public.Transaction
      .where({ uuid })
      .first()
    if (!transaction) throw new NotFoundError();
    return new Transaction(
      transaction.uuid,
      transaction.targetUuid,
      transaction.type as TokenType,
      transaction.state,
      transaction.createdAt,
      transaction.expiration || undefined,
    )
  }
  async getAll(user: User, type: TokenType, burned?: boolean): Promise<Transaction[]> {
    const all = await this.client.orm.public.Transaction
      .where({
        targetUuid: user.uuid,
        type: type,
        state: burned
      })
      .all();
    return all.map(transaction => new Transaction(
      transaction.uuid,
      transaction.targetUuid,
      transaction.type as TokenType,
      transaction.state,
      transaction.createdAt,
      transaction.expiration || undefined,
    ))
  }
}
