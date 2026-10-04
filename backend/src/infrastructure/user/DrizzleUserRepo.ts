import { User } from "@/models/user";
import { DrizzleRepo } from "../shared/DrizzleRepo";
import { IUserRepo } from "./IUserRepo";


class DrizzleUserRepo extends DrizzleRepo implements IUserRepo {
    getByUuid(uuid: string): Promise<User> {
        const fount = this.client.
    }
}