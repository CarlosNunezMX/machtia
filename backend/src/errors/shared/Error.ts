export class HttpError extends Error {
  constructor(
    public readonly httpCode: number,
    public readonly response: string,
  ) {
    super(response);
  }

  public toJSON() {
    return {
      code: this.httpCode,
    };
  }
}
