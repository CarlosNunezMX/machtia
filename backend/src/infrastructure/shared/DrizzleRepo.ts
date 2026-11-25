import { db } from "@providers/database";

export class DrizzleRepo {
  constructor(protected client: typeof db) {}
}
