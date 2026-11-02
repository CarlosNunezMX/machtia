export class Attachment {
    constructor(
        public uuid: string,
        public ownerUuid: string,
        public courseUuid: string,
        public assignmentUuid: string,
        public file: string,
        public name: string,
        public mime: string
    ) {}
}
