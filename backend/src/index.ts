import { Elysia } from "elysia";
import { gracefulShutdownDatabase, waitConnection } from "providers/database";

const app = new Elysia()
  .get("/", () => "Hello Elysia");

const onGraceful = async (event: string) => {
  app.stop(true);
  console.log("[Graceful Shutdown]: Closing all connections...");
  await gracefulShutdownDatabase();
  console.log("[Graceful Shutdown]: Exited successfully!");
  process.exit(0);
};

async function main() {
  await waitConnection();
  app.listen(3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
  process.on("SIGTERM", onGraceful);
  process.on("SIGINT", onGraceful);
  process.on("SIGKILL", onGraceful);
}

main();
