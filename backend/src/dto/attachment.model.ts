import { t, UnwrapSchema } from "elysia";
import { Model2Types } from "./shared";

export const AttachmentModels = {
  UploadAttachment: t.Object({
    courseUuid: t.String({ description: "Uuid of the course the attachment is in" }),
    assignmentUuid: t.String({ description: "Uuid of the assignment" }),
    file: t.File({
      description: "The uploaded file",
      type: ["image/*", "application/*", "text/*", "audio/*", "video/*"],
    }),
  }),

  Attachment: t.Object({
    uuid: t.String({ description: "Attachment uuid", readOnly: true }),
    ownerUuid: t.String({ description: "Uuid of the owner of the attachment", readOnly: true }),
    courseUuid: t.String({ description: "Uuid of the course the attachment is in", readOnly: true }),
    assignmentUuid: t.String({ description: "Uuid of the assignment", readOnly: true }),
    file: t.String({ description: "file route/url" }),
    name: t.String({ description: "file name" }),
    mime: t.String({ description: "file MIME type" }),
  })
} as const;



export type AttachmentModels = Model2Types<typeof AttachmentModels>