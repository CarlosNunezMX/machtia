CREATE TABLE "Assignment" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"courseUuid" uuid NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"dueAt" timestamp(3) with time zone,
	"lateSubmissions" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Attachment" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"ownerUuid" uuid NOT NULL,
	"submissionUuid" uuid NOT NULL,
	"file" text NOT NULL,
	"name" text NOT NULL,
	"mime" text NOT NULL,
	"createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CourseEnrollemnt" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"userUuid" uuid NOT NULL,
	"courseUuid" uuid NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Course" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"ownerUuid" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Submission" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"ownerUuid" uuid NOT NULL,
	"courseUuid" uuid NOT NULL,
	"assignmentUuid" uuid NOT NULL,
	"grade" real,
	"createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Transaction" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"targetUuid" uuid NOT NULL,
	"type" uuid NOT NULL,
	"expiration" timestamp(3) with time zone,
	"createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"state" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"organizationId" text,
	"verified" boolean DEFAULT false NOT NULL,
	"type" text DEFAULT 'Student' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseUuid_Course_uuid_fkey" FOREIGN KEY ("courseUuid") REFERENCES "Course"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_ownerUuid_User_uuid_fkey" FOREIGN KEY ("ownerUuid") REFERENCES "User"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_submissionUuid_Submission_uuid_fkey" FOREIGN KEY ("submissionUuid") REFERENCES "Submission"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "CourseEnrollemnt" ADD CONSTRAINT "CourseEnrollemnt_userUuid_User_uuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "CourseEnrollemnt" ADD CONSTRAINT "CourseEnrollemnt_courseUuid_Course_uuid_fkey" FOREIGN KEY ("courseUuid") REFERENCES "Course"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Course" ADD CONSTRAINT "Course_ownerUuid_User_uuid_fkey" FOREIGN KEY ("ownerUuid") REFERENCES "User"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_ownerUuid_User_uuid_fkey" FOREIGN KEY ("ownerUuid") REFERENCES "User"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_courseUuid_Course_uuid_fkey" FOREIGN KEY ("courseUuid") REFERENCES "Course"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignmentUuid_Assignment_uuid_fkey" FOREIGN KEY ("assignmentUuid") REFERENCES "Assignment"("uuid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_targetUuid_User_uuid_fkey" FOREIGN KEY ("targetUuid") REFERENCES "User"("uuid") ON DELETE CASCADE;