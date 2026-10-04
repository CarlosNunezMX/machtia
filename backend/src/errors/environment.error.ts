export class EnvironmentError extends Error {
  constructor(public readonly variables: string[]) {
    super("Missing environment variables!");
  }
}
