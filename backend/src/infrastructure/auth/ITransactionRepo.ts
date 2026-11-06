import { TokenType } from "@models/token";
import { Transaction } from "@models/transaction";
import { User } from "@models/user";

export interface ITransactionRepo {
  create(user: User, type: TokenType, expiration: Date): Promise<Transaction>;
  consume(uuid: string, type: TokenType): Promise<void>;
  get(uuid: string): Promise<Transaction>;
  getAll(user: User, type: TokenType, burned?: boolean): Promise<Transaction[]>
  revoke(uuid: string): Promise<Transaction>;
}
