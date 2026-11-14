import { Attachment } from "@models/attachment";
import { PrismaRepo } from "@infraestructure/shared/PrismaRepo";


export class AttachmentRepo extends PrismaRepo implements IAttachmentRepo {
	async create(body: Attachment, files: File): Promise<Attachment> {
		const attachment = await this.client.orm.public.Attachment.create({ body });
		return new Attachment(
			uuid: attachment.uuid,
			ownerUuid: attachment.ownerUuid,
			courseUuid: attachment.courseUuid,
			assignmentUuid: attachment.assignmentUuid,
			file: attachment.file,
			name: attachment.name,
			mime: attachment.mime
		);
	}

	async delete(uuid: string): Promise<void> {
		await this.client.orm.public.Attachment.where({ uuid }).delete();
	}

	async get(uuid: string): Promise<Attachment> {
		const attachment = await this.client.orm.public.Attachment.where(uuid);

		if(!attachment) {
			throw new NotFoundError();
		}

		return new Attachment(
			uuid: attachment.uuid,
			ownerUuid: attachment.ownerUuid,
			courseUuid: attachment.courseUuid,
			assignmentUuid: attachment.assignmentUuid,
			file: attachment.file,
			name: attachment.name,
			mime: attachment.mime
		);
	}


}