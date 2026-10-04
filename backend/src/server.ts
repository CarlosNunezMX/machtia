import { Elysia } from "elysia";
import Logger from "@logging";

export class Server {
  private logger = new Logger({ name: "server", date: true });
  constructor(
    private port: number,
    private application: Elysia,
  ) { }

  close() {
    this.logger.log("Graceful shutdown, closing server...");
    this.application.stop();
    this.logger.success("Graceful shutdown, server is closed");
  }

  listen() {
    this.application.listen(this.port);
    this.logger.log(`Application is ready on port: ${this.port}`);
  }
}
