import { drizzle } from "drizzle-orm/bun-sql";
const DATABASE_URL = process.env["DATABASE_URL"];

if (!DATABASE_URL)
  throw new Error("You need to specify the DATABASE_URL environment variable.");

export const database = drizzle({ connection: DATABASE_URL });

export const gracefulShutdownDatabase = () => database.$client.close();
