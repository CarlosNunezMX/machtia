import { UserRepo } from "@infrastructure/user";
import { AuthService } from "./auth.service";
import { JwtService, JwtSettings } from "./jwt.service";
import { TransactionService } from "./transaction.service";
import { TransactionRepo } from "@infrastructure/auth";

const preferences: JwtSettings = {
  expirations: {
    session: 30 * 60,
  },
  issuer: "com.machtia",
};

const jwt = new JwtService(process.env["JWT_SECRET"]!, preferences);

const transactionService = new TransactionService(
  UserRepo,
  TransactionRepo,
  preferences.expirations,
);

export const authService = new AuthService(UserRepo, jwt);
