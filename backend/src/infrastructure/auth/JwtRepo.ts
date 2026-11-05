import { Token, TokenType } from "@/models/token";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export interface SignedToken {
  token: string;
  expiration: number;
}

export interface JwtSettings {
  expirations: Record<TokenType, number>;
  issuer: string;
};

export class JwtRepo {
  constructor(
    private readonly secret: string,
    private readonly preferences: JwtSettings
  ) { }
  sign(userUuid: string, type: TokenType, expires: boolean = true): SignedToken {
    const expiration = this.preferences.expirations[type];
    const token = sign(new Token(type, userUuid), this.secret, {
      issuer: this.preferences.issuer,
      expiresIn: expires ? expiration : undefined
    });

    return { token, expiration }
  }

  verify(token: string): Token {
    const _token = verify(token, this.secret, { issuer: this.preferences.issuer }) as JwtPayload & Token;
    return new Token(_token.type, _token.userUuid)
  }
}
