import TokenMissmatchError from "@/errors/auth/token";
import { Token, TokenType } from "@models/token";
import { Transaction } from "@models/transaction";
import { User } from "@models/user";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export interface SignedToken {
  token: string;
  expiration: number;
}

export interface JwtSettings {
  expirations: Record<TokenType, number>;
  issuer: string;
};

export class JwtService {
  constructor(
    private readonly secret: string,
    public readonly preferences: JwtSettings
  ) { }
  sign(transaction: Transaction): SignedToken {
    const token = new Token(
      transaction.type,
      transaction.targetUuid,
      transaction.uuid,
    )

    const expiration = this.preferences.expirations[transaction.type];
    const jwt = sign(token, this.secret, {
      expiresIn: expiration,
    })

    return { expiration, token: jwt }
  }

  session(user: User): SignedToken {
    const _token = new Token("session", user.uuid);
    const expiration = this.preferences.expirations.session;

    const token = sign(_token, this.secret, { expiresIn: expiration });
    return { expiration, token }
  }

  decode(token: string, type: TokenType): Token {
    const verified = verify(token, this.secret) as JwtPayload & Token;
    if (verified.type !== type) throw new TokenMissmatchError();
    return new Token(
      verified.type,
      verified.userUuid,
      verified.jti,
    )
  }

}
