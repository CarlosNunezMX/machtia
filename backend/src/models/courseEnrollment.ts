export class CourseEnrollment {
    constructor(
        public readonly uuid: string,
        public readonly userUuid: string,
        public readonly courseUuid: string,
        public readonly status: boolean,

        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) { }
}