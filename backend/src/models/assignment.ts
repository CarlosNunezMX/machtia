export class Assignment {
    constructor(
        public uuid: string,
        public courseUuid: string,
        public title: string,
        public body: string,
        public createdAt: Date,
        public updatedAt: Date,
        public dueAt: Date,
        public attachments: Attachment[],
        public lateSubmissionsAllowed: boolean
    ) {}
}