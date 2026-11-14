import { db } from "@providers/database"
import { PrismaUserRepo } from "./PrismaUserRepo"

export const UserRepo = new PrismaUserRepo(db);