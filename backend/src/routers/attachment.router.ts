import { Attachment } from "models/attachment";
import { AttachmentModels } from "../dto/attachment.model";
import Elysia from "elysia";

export const AttachmentRouter = new Elysia({ prefix: "/file" })
  .post("/attach", async ({ body, ownerUuid }) => {
    const uploadedFile = body.file;

    const savedPath = `/uploads/${Date.now()}-${uploadedFile.name}`;
    await Bun.write(`.${savedPath}`, uploadedFile);

    const uploadAttachment: Attachment = {
        uuid: crypto.randomUUID(),
        ownerUuid: ownerUuid,
        courseUuid: body.courseUuid,
        assignmentUuid: body.assignmentUuid,
        file: savedPath,
        name: uploadedFile.name,
        mime: uploadedFile.type,
    };

    return await attachmentRepo.create(body);
  })