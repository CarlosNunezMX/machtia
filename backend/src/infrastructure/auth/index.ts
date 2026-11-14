import { db } from "@providers/database";
import { TransactionPrismaRepo } from "./PrismaTransactionRepo";

export const TransactionRepo = new TransactionPrismaRepo(db);