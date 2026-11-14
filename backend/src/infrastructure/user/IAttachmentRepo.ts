import { Attachment } from "@models/attachment";

export interface IAttachmentRepo {
	create(body: Attachment, files: File): Promise<Attachment>;
	delete(uuid: string): Promise<void>;
	get(uuid: string): Promise<Attachment>;
}