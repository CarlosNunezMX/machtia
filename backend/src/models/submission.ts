import { Attachment } from "./attachment.ts";
export class Submission {
	constructor(
	    public ownerUuid: string,
	    public courseUuid: string,
	    public assignmentUuid: stirng,
	    public grade: int,
	    public attachments: Attachment[]
	) {}
}
