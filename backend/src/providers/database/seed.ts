import { User } from "models/user";
import { db, gracefulShutdownDatabase } from ".";
import { userTable } from "./schema";

const email = process.env["MACHTIA_ROOT"],
  password = process.env["MACHTIA_ROOT_PWD"];

if (!email || !password)
  throw "Please specify root credentials to run this script!";

const user = new User(
  crypto.randomUUID(),
  email,
  "Administrator",
  Bun.password.hashSync(password),
  "Admin",
);

await db.insert(userTable).values({
  uuid: user.uuid,
  email: user.email,
  name: user.name,
  password: user.password,
  type: user.type,
});

await gracefulShutdownDatabase();

console.log("== Machtia Seeder ==");
console.log("email: ", user.email);
console.log("password: ", password);
