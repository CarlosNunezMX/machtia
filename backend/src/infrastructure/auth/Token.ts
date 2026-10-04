export type TokenType = "session" | "recovery" | "verification";
export class Token {
  constructor(
    public readonly userUuid: string,
    public readonly tokenType: TokenType,
  ) {}
}
