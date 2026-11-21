import { Assignment } from "@models/assignment";
import { PrismaRepo } from "../shared/PrismaRepo";
import { IAssignmentRepo } from "./IAssignmentRepo";
import { NotFoundError } from "../../errors/NotFound";


export class AssignmentRepo extends PrismaRepo implements IAssignmentRepo {
	async create(body: Assignment): Promise<Assignment> {
		const assignment = await this.client.orm.public.Assignment.create(body);
		return assignment;
	}

	async delete(uuid: string): Promise<void> {
		await this.client.orm.public.Assignment.where({ uuid }).delete();
	}

	async get(uuid: string): Promise<Assignment> {
		const assignment = this.client.orm.public.Assignment.where({ uuid });

		if(!assignment) {
			throw new NotFoundError();
		}

		return assignment;
	}
}