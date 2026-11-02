export class CourseSchedule {
	constructor(
		public courseUuid: string,
		public uuid: string,
		public start: string,
		public end: string,
		public weekdays: string,
		public classroom: string
	) {}
}