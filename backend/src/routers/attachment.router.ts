import { Attachment } from "models/attachment";
import { AttachmentRepo } from "../infrastructure/attachment/AttachmentRepo";
import { AttachmentModels } from "../dto/attachment.model";
import Elysia from "elysia";

export const AttachmentRouter = new Elysia({ prefix: "/file" }).post(
  "/attach",
  async ({ body, ownerUuid }) => {
    const savedPath = `/uploads/${Date.now()}-${body.file.name}`;
    await Bun.write(`.${savedPath}`, body.file);

    const uploadAttachment: Attachment = {
      uuid: crypto.randomUUID(),
      ownerUuid: ownerUuid,
      courseUuid: body.courseUuid,
      assignmentUuid: body.assignmentUuid,
      file: savedPath,
      name: body.file.name,
      mime: body.file.type,
    };

    return await attachmentRepo.create(uploadAttachment);
  },
);
