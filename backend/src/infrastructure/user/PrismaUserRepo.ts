import { User, UserType } from "@models/user";
import { PrismaRepo } from "../shared/PrismaRepo";
import { IUserRepo } from "./IUserRepo";
import NotFoundError from "@errors/NotFound";


class PrismaUserRepo extends PrismaRepo implements IUserRepo {
    async getByUuid(uuid: string): Promise<User> {
        const user = await this.client.orm.public.User
            .where({ uuid })
            .limit(1)
            .first()
        if (!user) throw new NotFoundError();
        return new User(
            user.uuid,
            user.email,
            user.name,
            user.password,
            user.organizationId || undefined,
            user.verified,
            user.type as UserType
        )
    }

    async delete(uuid: string): Promise<void> {
        await this.client.orm.public.User.where({ uuid }).delete()
    }
    async deleteMany(uuid: string[]): Promise<void> {
        await this.client.orm.public.User.where(p => p.uuid.in(uuid)).deleteAll()
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.client.orm.public.User.where({ email }).first()
        if (!user) throw new NotFoundError();
        return new User(
            user.uuid,
            user.email,
            user.name,
            user.password,
            user.organizationId || undefined,
            user.verified,
            user.type as UserType
        )
    }

    async get(user: Partial<Omit<User, "password">>): Promise<User[]> {
        const users = await this.client.orm.public.User.where(user).all()
        return users.map(user => new User(
            user.uuid,
            user.email,
            user.name,
            user.password,
            user.organizationId || undefined,
            user.verified,
            user.type as UserType
        ))
    }

    async create(body: User): Promise<User> {
        const user = await this.client.orm.public.User.create(body);
        return new User(
            user.uuid,
            user.email,
            user.name,
            user.password,
            user.organizationId || undefined,
            user.verified,
            user.type as UserType
        );
    }

    async getManyByUuid(uuid: string[]): Promise<User[]> {
        const users = await this.client.orm.public.User.where(p => p.uuid.in(uuid)).all()
        return users.map(user => new User(
            user.uuid,
            user.email,
            user.name,
            user.password,
            user.organizationId || undefined,
            user.verified,
            user.type as UserType
        ))
    }

    async update(body: Partial<User> & { uuid: string; }): Promise<User> {
        const user = await this.client.orm.public.User.where({ uuid: body.uuid }).update(body);
        if (!user) throw new NotFoundError();
        return new User(
            user.uuid,
            user.email,
            user.name,
            user.password,
            user.organizationId || undefined,
            user.verified,
            user.type as UserType
        )
    }
}