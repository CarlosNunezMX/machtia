import { Attachment } from "@models/attachment";


export class AttachmentRepo {
	create(body: Attachment, files: File): Promise<Attachment> {
	}

	delete(uuid: string): Promise<void>  {
	}

	get(uuid: string): Promise<Attachment> {
	}


}