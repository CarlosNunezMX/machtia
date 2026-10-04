import Logger from "@logging";
import { type BucketProvider } from "./bucket.provider";
import { type S3Client } from "bun";

export class BunS3Provider implements BucketProvider {
  constructor(private readonly instance: S3Client) {}
  private logger = new Logger({ name: "BunS3Provider", date: true });
  async write(path: string, content: Uint8Array): Promise<void> {
    const bucket_file = this.instance.file(path);
    await bucket_file.write(content);
  }

  async delete(path: string): Promise<void> {
    const file = this.instance.file(path);
    if (!(await file.exists())) throw new Error("File does not exists!");
    await this.instance.delete(path);
  }

  async file(path: string): Promise<Uint8Array> {
    const file = this.instance.file(path);
    if (!(await file.exists())) throw new Error("File does not exists!");
    const content = await file.arrayBuffer();
    return new Uint8Array(content);
  }

  async gracefulShutdown(): Promise<void> {
    this.logger.info("Graceful Shutdown - Nothing to do...")
  }



}
