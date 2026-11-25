import { Course } from "models/course";

export interface ICourseRepo {
  delete(uuid: string): Promise<void>;
  create(course: Course): Promise<Course>;
  getByUser(user: string): Promise<Course[]>;
  getByOwner(ownerUuid: string): Promise<Course[]>;
}
