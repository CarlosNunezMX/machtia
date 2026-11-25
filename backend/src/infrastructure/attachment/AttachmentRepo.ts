import { Attachment } from "@models/attachment";
import { DrizzleRepo } from "../shared/DrizzleRepo";
import { IAttachmentRepo } from "./IAttachmentRepo";
import NotFoundError from "@errors/NotFound";
import { attachmentTable } from "providers/database/schema";
import { eq } from "drizzle-orm";

export class AttachmentRepo extends DrizzleRepo implements IAttachmentRepo {
  async create(body: Attachment): Promise<Attachment> {
    const [attachment] = await this.client
      .insert(attachmentTable)
      .values({
        uuid: body.uuid,
        file: body.file,
        mime: body.mime,
        name: body.name,
        ownerUuid: body.ownerUuid,
        assignemntUuid: body.assignmentUuid,
        courseUuid: body.courseUuid,
      })
      .returning()
      .execute();
    // @TODO: Add throwing event
    if (!attachment) throw "";
    const {
      createdAt,
      file,
      mime,
      name,
      ownerUuid,
      uuid,
      courseUuid,
      assignemntUuid,
    } = attachment;
    return new Attachment(
      uuid,
      ownerUuid,
      courseUuid,
      assignemntUuid,
      file,
      name,
      mime,
      createdAt,
    );
  }

  async delete(uuid: string): Promise<void> {
    await this.client
      .delete(attachmentTable)
      .where(eq(attachmentTable.uuid, uuid));
  }

  async get(targetUuid: string): Promise<Attachment> {
    const [attachment] = await this.client
      .select()
      .from(attachmentTable)
      .where(eq(attachmentTable.uuid, targetUuid))
      .limit(1);
    if (!attachment) throw new NotFoundError();
    const {
      createdAt,
      file,
      mime,
      name,
      ownerUuid,
      uuid,
      courseUuid,
      assignemntUuid,
    } = attachment;
    return new Attachment(
      uuid,
      ownerUuid,
      courseUuid,
      assignemntUuid,
      file,
      name,
      mime,
      createdAt,
    );
  }
}
