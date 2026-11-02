export type TokenType = "session" | "verification" | "recovery";
export class Token {
	constructor(
  		public type: TokenType = "Session",
  		public userUuid: string
    ) {}
}