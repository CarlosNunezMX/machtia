export type UserType = "Student" | "Teacher" | "Admin";
export class User {
  constructor(
    public readonly uuid: string,
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly organizationId: string,
    public readonly verified: boolean = false,
    public readonly type: UserType = "Student",
  ) {}
}
