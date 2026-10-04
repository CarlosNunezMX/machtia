export interface BucketProvider {
  file(path: string): Promise<Uint8Array>;
  delete(path: string): Promise<void>;
  write(path: string, file: Uint8Array): Promise<void>;
  gracefulShutdown(): Promise<void>;
}
