import { CourseSchedule } from "./CourseSchedule.ts";
export class Course {
	constructor(
	    public uuid: string,
	    public ownerUuid: string,
	    public name: string,
	    public description: string,
	    public schedule: CourseSchedule[],
	    public startDate: Date,
	    public endDate: Date
	) {}
}
