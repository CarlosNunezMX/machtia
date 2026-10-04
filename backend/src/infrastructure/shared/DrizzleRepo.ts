import { database } from "@providers/database.drizzle";

export class DrizzleRepo {
    constructor(
        protected client: typeof database
    ) { }
};