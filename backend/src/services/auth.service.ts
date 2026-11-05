import { AuthModels } from "@/dto/auth.model";
import { PasswordMissmatchError } from "@/errors/PasswordMissmatch";
import { JwtRepo, SignedToken } from "@/infrastructure/auth/JwtRepo";
import { IUserRepo } from "@/infrastructure/user/IUserRepo";



export class AuthService {
    constructor(
        private readonly userRepo: IUserRepo,
        private readonly jwtRepo: JwtRepo
    ) { }

    async login({ email, keepSigned, password }: AuthModels["signIn"]): Promise<SignedToken> {
        const user = await this.userRepo.getByEmail(email);
        const isPasswordValid = await Bun.password.verify(password, user.password);
        if (!isPasswordValid) throw new PasswordMissmatchError();
        const token = await this.jwtRepo.sign(user.uuid, "session", !keepSigned);
        return token
    }
};