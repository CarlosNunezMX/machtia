import { Token, TokenType } from "@/models/token";
import { JwtPayload, sign, verify } from "jsonwebtoken";
export class JwtRepo {
  constructor(
    private readonly secret: string,
    private readonly issuer: string,
  ) {}
  sign(userUuid: string, type: TokenType): string {
    return sign(new Token(type, userUuid), this.secret, {
      issuer: this.issuer,
    });
  }

  verify(token: string): Token {
    const _token = verify(token, this.secret, { issuer: this.issuer }) as JwtPayload & Token;
    return new Token(_token.type, _token.userUuid)
  }
}
