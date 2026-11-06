import { t, UnwrapSchema } from "elysia";
import { Model2Types } from "./shared";

export const AuthModels = {
  signIn: t.Object({
    email: t.String({ description: "The user email", format: "email" }),
    password: t.String({ description: "The user password" }),
    keepSigned: t.Boolean({
      description: "If it's checked, the token will not have expiration",
      default: false,
    }),
  }),

  authSuccess: t.Object({
    token: t.String({ description: "Your session token", readOnly: true }),
    expiration: t.Number({ description: "Session Token expiration time (ms)" })
  }, { title: "Auth Sucess", description: "Returns the token with expiration details" }),

  signup: t.Object({
    name: t.String({
      description: "Student full name.",
      readOnly: true
    }),
    email: t.String({
      description: "Student schoolar email.",
      readOnly: true,
      format: "email"
    }),
    organizationId: t.Optional(t.String({
      description: "Student organization internal ID (maybe used for grading)",
      readOnly: true
    })),
    password: t.String({
      description: "Student password",
      readOnly: true
    })
  })
} as const;



export type AuthModels = Model2Types<typeof AuthModels>