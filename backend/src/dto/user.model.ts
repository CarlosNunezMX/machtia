import { t } from "elysia";

export const userModels = {
  signIn: t.Object({
    email: t.String({ description: "The user email", format: "email" }),
    password: t.String({ description: "The user password" }),
    keepSigned: t.Boolean({
      description: "If it's checked, the token will not have expiration",
      default: false,
    }),
  }),

  signup: t.Object({
  })
};
