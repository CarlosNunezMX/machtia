export type TokenType = "session" | "recovery" | "verification";
export class Token {
	constructor(
  		public type: TokenType = "session",
  		public userUuid: string
    ) {}
}