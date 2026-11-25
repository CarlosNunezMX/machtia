import { and, eq, inArray, type SQL } from "drizzle-orm";
import { User, UserType } from "@models/user";
import NotFoundError from "@errors/NotFound";
import { DrizzleRepo } from "../shared/DrizzleRepo";
import { userTable } from "@providers/database/schema";
import { IUserRepo } from "./IUserRepo";

type UserRow = typeof userTable.$inferSelect;

function toDomain(user: UserRow): User {
  return new User(
    user.uuid,
    user.email,
    user.name,
    user.password,
    user.type as UserType,
    user.organizationId ?? undefined,
  );
}

function toRow(user: User) {
  return {
    uuid: user.uuid,
    email: user.email,
    name: user.name,
    password: user.password,
    type: user.type,
    organizationId: user.organizationId ?? null,
  };
}

export class DrizzleUserRepo extends DrizzleRepo implements IUserRepo {
  async getByUuid(uuid: string): Promise<User> {
    const [user] = await this.client
      .select()
      .from(userTable)
      .where(eq(userTable.uuid, uuid))
      .limit(1);
    if (!user) throw new NotFoundError();
    return toDomain(user);
  }

  async delete(uuid: string): Promise<void> {
    await this.client.delete(userTable).where(eq(userTable.uuid, uuid));
  }

  async deleteMany(uuid: string[]): Promise<void> {
    if (uuid.length === 0) return;
    await this.client.delete(userTable).where(inArray(userTable.uuid, uuid));
  }

  async getByEmail(email: string): Promise<User> {
    const [user] = await this.client
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);
    if (!user) throw new NotFoundError();
    return toDomain(user);
  }

  async get(user: Partial<Omit<User, "password">>): Promise<User[]> {
    const conditions: SQL[] = [];
    if (user.uuid !== undefined) conditions.push(eq(userTable.uuid, user.uuid));
    if (user.email !== undefined)
      conditions.push(eq(userTable.email, user.email));
    if (user.name !== undefined) conditions.push(eq(userTable.name, user.name));
    if (user.type !== undefined) conditions.push(eq(userTable.type, user.type));
    if (user.organizationId !== undefined)
      conditions.push(eq(userTable.organizationId, user.organizationId));

    const rows = await this.client
      .select()
      .from(userTable)
      .where(conditions.length ? and(...conditions) : undefined);
    return rows.map(toDomain);
  }

  async create(body: User): Promise<User> {
    const [user] = await this.client
      .insert(userTable)
      .values(toRow(body))
      .returning();
    if (!user) throw new Error("Failed to create user");
    return toDomain(user);
  }

  async getManyByUuid(uuid: string[]): Promise<User[]> {
    if (uuid.length === 0) return [];
    const rows = await this.client
      .select()
      .from(userTable)
      .where(inArray(userTable.uuid, uuid));
    return rows.map(toDomain);
  }

  async update(body: Partial<User> & { uuid: string }): Promise<User> {
    const { uuid, ...rest } = body;
    const values: Partial<ReturnType<typeof toRow>> = {};
    if (rest.email !== undefined) values.email = rest.email;
    if (rest.name !== undefined) values.name = rest.name;
    if (rest.password !== undefined) values.password = rest.password;
    if (rest.type !== undefined) values.type = rest.type;
    if (rest.organizationId !== undefined)
      values.organizationId = rest.organizationId ?? null;

    const [user] = await this.client
      .update(userTable)
      .set(values)
      .where(eq(userTable.uuid, uuid))
      .returning();
    if (!user) throw new NotFoundError();
    return toDomain(user);
  }
}
