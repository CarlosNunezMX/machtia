import { User } from "@/models/user";

type IUserRepo__ByRequest = Partial<Omit<User, "password">>;

export interface IUserRepo {
  get(user: IUserRepo__ByRequest): Promise<User[]>;
  getByUuid(uuid: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getManyByUuid(uuid: string[]): Promise<User[]>;
  getManyBy(params: IUserRepo__ByRequest[]): Promise<User[]>;

  delete(uuid: string): Promise<void>;
  deleteMany(uuid: string): Promise<void>;

  update(uuid: string, body: Partial<Omit<User, "uuid">>): Promise<User>;
  create(body: User): Promise<User>;
}
