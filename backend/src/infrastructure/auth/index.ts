import { db } from "@providers/database";
import { TransactionDrizzleRepo } from "./DrizzleTransactionRepo";

export const TransactionRepo = new TransactionDrizzleRepo(db);
