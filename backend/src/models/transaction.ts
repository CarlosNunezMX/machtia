import { TokenType } from "./token";

export class Transaction {
  constructor(
    public readonly uuid: string,
    public readonly targetUuid: string,
    public readonly type: TokenType,
    public readonly state: boolean,
    public readonly createdAt: Date,
    public readonly expiration?: Date,
  ) {}
}
