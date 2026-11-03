export type TokenType = "session" | "recovery" | "verification";
export class Token {
	constructor(
  		public userUuid: string,
  		public type: TokenType = "session"
    ) {}
}