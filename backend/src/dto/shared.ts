import { UnwrapSchema } from "elysia";

export type Model2Types<Entry> = {
  // @ts-ignore
  [k in keyof Entry]: UnwrapSchema<Entry[k]>
}