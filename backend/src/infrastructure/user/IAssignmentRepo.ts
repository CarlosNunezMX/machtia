import { Assignment } from "@models/assignment";

export interface IAssignmentRepo {
	create(body: Assignment, files: File): Promise<Assignment>;
	update(body: Assignment, files: File): Promise<Assignment>;
	delete(uuid: string): Promise<void>;
	get(uuid: string): Promise<Assignment>;
}