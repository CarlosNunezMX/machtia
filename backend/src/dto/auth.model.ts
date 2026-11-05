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

  loginResponse: t.Object({
    token: t.String({ description: "Your session token", readOnly: true }),
    expiration: t.Number({ description: "Session Token expiration time (ms)" })
  }, { title: "Auth Sucess", description: "Returns the token with expiration details" }),

  signup: t.Object({
  })
} as const;



export type AuthModels = Model2Types<typeof AuthModels>