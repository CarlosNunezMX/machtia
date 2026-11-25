import { t } from "elysia";

export const UserModels = {
    user: t.Object({
        uuid: t.String({ description: "User uuid", format: "uuid" }),
        email: t.String({ description: "User email", format: "email" }),
        type: t.Union([
            t.Literal("Admin"),
            t.Literal("Teacher"),
            t.Literal("Student")
        ], { description: "User type, defines the different access levels" }),
        name: t.String({ description: "User display name", examples: ["John Doe", "Steve Smith"] }),
        organizationId: t.Optional(t.String({ description: "The origanization internal user id", examples: ["221234567"] }))
    })
}