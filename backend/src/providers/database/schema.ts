import {
  boolean,
  date,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  type PgTable,
} from "drizzle-orm/pg-core";

/**
 * Drizzle schema mirroring the existing PostgreSQL tables.
 * Table and column names are kept verbatim so no data migration is needed.
 */
export const userTable = pgTable("User", {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  organizationId: text("organizationId"),
  verified: boolean("verified").notNull().default(false),
  type: text("type").notNull().default("Student"),
});

export const assignmentTable = pgTable("Assignment", {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  courseUuid: uuid("courseUuid")
    .notNull()
    .references(() => courseTable.uuid, { onDelete: "cascade" }),
  title: text("title").notNull(),
  body: text("body").notNull(),
  dueAt: timestamp("dueAt", { withTimezone: true, precision: 3 }),
  lateSubmissions: boolean("lateSubmissions").notNull().default(false),
  createdAt: timestamp("createdAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const courseTable = pgTable("Course", {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  ownerUuid: uuid("ownerUuid")
    .notNull()
    .references(() => userTable.uuid, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const submissionTable = pgTable("Submission", {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  ownerUuid: uuid("ownerUuid")
    .notNull()
    .references(() => userTable.uuid, { onDelete: "cascade" }),
  courseUuid: uuid("courseUuid")
    .notNull()
    .references(() => courseTable.uuid, { onDelete: "cascade" }),
  assignmentUuid: uuid("assignmentUuid")
    .notNull()
    .references(() => assignmentTable.uuid, { onDelete: "cascade" }),
  grade: real("grade"),
  createdAt: timestamp("createdAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const courseEnrollmentTable = pgTable("CourseEnrollemnt", {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  userUuid: uuid("userUuid")
    .notNull()
    .references(() => userTable.uuid, { onDelete: "cascade" }),
  courseUuid: uuid("courseUuid")
    .notNull()
    .references(() => courseTable.uuid, { onDelete: "cascade" }),
  status: boolean("status").notNull().default(true),
  createdAt: timestamp("createdAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const attachmentTable = pgTable("Attachment", {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  ownerUuid: uuid("ownerUuid")
    .notNull()
    .references(() => userTable.uuid, { onDelete: "cascade" }),
  submissionUuid: uuid("submissionUuid")
    .notNull()
    .references(() => submissionTable.uuid, { onDelete: "cascade" }),
  file: text("file").notNull(),
  name: text("name").notNull(),
  mime: text("mime").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
});

export const transactionTable = pgTable("Transaction", {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  targetUuid: uuid("targetUuid")
    .notNull()
    .references(() => userTable.uuid, { onDelete: "cascade" }),
  type: uuid("type").notNull(),
  expiration: timestamp("expiration", { withTimezone: true, precision: 3 }),
  createdAt: timestamp("createdAt", { withTimezone: true, precision: 3 })
    .notNull()
    .defaultNow(),
  state: boolean("state").notNull(),
});

export const schema = {
  user: userTable,
  assignment: assignmentTable,
  course: courseTable,
  submission: submissionTable,
  courseEnrollment: courseEnrollmentTable,
  attachment: attachmentTable,
  transaction: transactionTable,
} satisfies Record<string, PgTable>;

export type Schema = typeof schema;
