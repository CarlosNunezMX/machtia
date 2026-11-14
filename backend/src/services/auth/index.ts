import { UserRepo } from "@infrastructure/user"
import { AuthService } from "./auth.service"
import { JwtService, JwtSettings } from "./jwt.service"
import { TransactionService } from "./transaction.service"
import { TransactionRepo } from "@infrastructure/auth"

const preferences: JwtSettings = {
    expirations: {
        recovery: 5 * 60000,
        session: 30 * 60000,
        verification: 5 * 60000
    },
    issuer: "com.machtia"
}

const jwt = new JwtService(
    process.env["JWT_SECRET"]!,
    preferences
)

const transactionService = new TransactionService(
    UserRepo,
    TransactionRepo,
    preferences.expirations
)