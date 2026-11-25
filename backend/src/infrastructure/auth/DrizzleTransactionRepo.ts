import { and, eq } from "drizzle-orm";
import { NotFoundError } from "elysia";
import { TokenType } from "@models/token";
import { Transaction } from "@models/transaction";
import { User } from "@models/user";
import {
  BurnedTransactionError,
  ExpiratedTransaction,
  TransactionTypeMissmatch,
} from "@errors/auth/transaction";
import { DrizzleRepo } from "../shared/DrizzleRepo";
import { transactionTable } from "@providers/database/schema";
import { ITransactionRepo } from "./ITransactionRepo";

type TransactionRow = typeof transactionTable.$inferSelect;

function toDomain(transaction: TransactionRow): Transaction {
  return new Transaction(
    transaction.uuid,
    transaction.targetUuid,
    transaction.type as TokenType,
    transaction.state,
    transaction.createdAt,
    transaction.expiration ?? undefined,
  );
}

export class TransactionDrizzleRepo
  extends DrizzleRepo
  implements ITransactionRepo
{
  async create(
    user: User,
    type: TokenType,
    expiration: Date,
  ): Promise<Transaction> {
    const [transaction] = await this.client
      .insert(transactionTable)
      .values({
        state: false,
        targetUuid: user.uuid,
        type,
        expiration,
      })
      .returning();
    if (!transaction) throw new Error("Failed to create transaction");
    return toDomain(transaction);
  }

  async consume(uuid: string, type: TokenType): Promise<void> {
    const [transaction] = await this.client
      .select()
      .from(transactionTable)
      .where(eq(transactionTable.uuid, uuid))
      .limit(1);
    if (!transaction) throw new NotFoundError();
    if (transaction.expiration && transaction.expiration > new Date())
      throw new ExpiratedTransaction();
    if (transaction.state) throw new BurnedTransactionError();
    if (transaction.type !== type) throw new TransactionTypeMissmatch();

    await this.client
      .update(transactionTable)
      .set({ state: true })
      .where(eq(transactionTable.uuid, uuid));
  }

  async revoke(uuid: string): Promise<Transaction> {
    const [transaction] = await this.client
      .update(transactionTable)
      .set({ state: true })
      .where(eq(transactionTable.uuid, uuid))
      .returning();
    if (!transaction) throw new NotFoundError();
    return toDomain(transaction);
  }

  async get(uuid: string): Promise<Transaction> {
    const [transaction] = await this.client
      .select()
      .from(transactionTable)
      .where(eq(transactionTable.uuid, uuid))
      .limit(1);
    if (!transaction) throw new NotFoundError();
    return toDomain(transaction);
  }

  async getAll(
    user: User,
    type: TokenType,
    burned?: boolean,
  ): Promise<Transaction[]> {
    const conditions = [
      eq(transactionTable.targetUuid, user.uuid),
      eq(transactionTable.type, type),
    ];
    if (burned !== undefined)
      conditions.push(eq(transactionTable.state, burned));

    const rows = await this.client
      .select()
      .from(transactionTable)
      .where(and(...conditions));
    return rows.map(toDomain);
  }
}
