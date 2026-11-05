import { db, contract } from "@providers/database";

export class PrismaRepo {
    constructor(
        protected client: typeof db
    ) { }
};