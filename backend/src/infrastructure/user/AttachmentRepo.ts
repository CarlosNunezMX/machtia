import { Attachment } from "@models/attachment";
import { PrismaRepo } from "../shared/PrismaRepo";
import { IAttachmentRepo } from "./IAttachmentRepo";
import { NotFoundError } from "../../errors/NotFound";


export class AttachmentRepo extends PrismaRepo implements IAttachmentRepo {
	async create(body: Attachment): Promise<Attachment> {
		const attachment = await this.client.orm.public.Attachment.create(body);
		return attachment;
	}

	async delete(uuid: string): Promise<void> {
		await this.client.orm.public.Attachment.where({ uuid }).delete();
	}

	async get(uuid: string): Promise<Attachment> {
		const attachment = this.client.orm.public.Attachment.where(uuid);

		if(!attachment) {
			throw new NotFoundError();
		}

		return attachment;
	}


}