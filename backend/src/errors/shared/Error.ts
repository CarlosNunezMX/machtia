export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly response: string,
  ) {
    super(response);
  }

  public toJSON() {
    return {
      code: this.status,
    };
  }
}
