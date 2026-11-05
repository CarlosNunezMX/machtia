import { Attachment } from "./attachment";
export class Submission {
	constructor(
		public ownerUuid: string,
		public courseUuid: string,
		public assignmentUuid: string,
		public createdAt: Date,
		public updatedAt: Date,
		public attachments: Attachment[] = [],
		public grade?: number,
	) { }
}
