import { gracefulShutdownDatabase } from "@providers/database.drizzle";
import { MainRouter } from "@routers/router";
import { Server } from "@/server";
import Logger from "@logging";
import Bucket from "@bucket";

// @ts-ignore
const server = new Server(3000, MainRouter);
const logger = Logger.as("application");

const onGraceful = async (event: string) => {
  server.close();
  logger.log("Graceful Shutdown, closing all connections...");
  await gracefulShutdownDatabase();
  await Bucket.gracefulShutdown();
  logger.success("Graceful Shutdown, exited successfully!");
  process.exit(0);
};

async function main() {
  server.listen();
  process.on("SIGTERM", onGraceful);
  process.on("SIGINT", onGraceful);
  process.on("SIGKILL", onGraceful);
}

main();
