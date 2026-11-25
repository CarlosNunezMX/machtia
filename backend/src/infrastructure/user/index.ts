import { db } from "@providers/database";
import { DrizzleUserRepo } from "./DrizzleUserRepo";

export const UserRepo = new DrizzleUserRepo(db);
