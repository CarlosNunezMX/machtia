export type TokenType = "session" | "recovery" | "verification";
export class Token {
	constructor(
		public readonly type: TokenType,
		public readonly userUuid: string,
		public readonly jti?: string,
    ) {}
}
