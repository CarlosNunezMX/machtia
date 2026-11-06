import { AuthModels } from "@/dto/auth.model";
import { PasswordMissmatchError } from "@/errors/auth/passwordMissmatch";

import { SignedToken, JwtService } from "@services/auth/jwt.service";
import { IUserRepo } from "@infrastructure/user/IUserRepo";
import { User } from "@models/user";



export class AuthService {
    constructor(
        private readonly userRepo: IUserRepo,
        private readonly jwtService: JwtService
    ) { }

    async login({ email, password }: AuthModels["signIn"]): Promise<SignedToken> {
        const user = await this.userRepo.getByEmail(email);
        const isPasswordValid = await Bun.password.verify(password, user.password);

        if (!isPasswordValid) throw new PasswordMissmatchError();
        const token = this.jwtService.session(user);
        return token;
    }

    async signUp({ email, name, password, organizationId }: AuthModels["signup"]): Promise<SignedToken> {
        password = await Bun.password.hashSync(password);
        const user = new User(
            crypto.randomUUID(),
            email,
            name,
            password,
            false,
            "Student"
        );

        const newUser = await this.userRepo.create(user);
        const token = this.jwtService.session(newUser);
        return token;
    }

};