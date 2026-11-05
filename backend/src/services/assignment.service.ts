// temporal routing
import Logger from "../logging";
import { Course } from "../models/course";
import { User } from "../models/user";
import { Assignment } from "../models/assignment";
import { Attachment } from "../models/attachment";

// AI Slop detected?
// @todo: Review this code and fix it

export class AssignmentService {
  constructor(
    private assignmentRepo: IAssignmentRepo,
    private attachmentRepo: IAttachmentRepo,
    private courseRepo: ICourseRepo,
    private logger: Logger,
  ) {}

  // Helper functions
  private async assertCanManageCourse(
    user: User,
    courseUuid: string,
  ): Promise<Course> {
    const course = await this.courseRepo.get(courseUuid);

    if (!course) {
      throw new Error("Course not found");
    }

    const isUserOwner = course.ownerUuid === user.uuid;

    if (user.type !== "Admin" && !isUserOwner) {
      throw new Error("Unauthorized");
    }

    return course;
  }

  private async assertCanManageAssignment(
    user: User,
    assignmentUuid: string,
  ): Promise<Assignment> {
    const assignment = await this.assignmentRepo.get(assignmentUuid);

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    await this.assertCanManageCourse(user, assignment.courseUuid);
    return assignment;
  }

  // CRUD functions
  async create(
    user: User,
    body: Omit<Assignment, "uuid">,
  ): Promise<Assignment> {
    const course = await this.assertCanManageCourse(user, body.courseUuid);

    if (new Date(body.dueAt) < new Date()) {
      throw new Error("Due date cannot be in the past");
    }

    const assignment = await this.assignmentRepo.create({
      ...body,
      uuid: crypto.randomUUID(),
    });

    this.logger.log(`Assignment created: ${assignment.uuid}`);
    return assignment;
  }

  async update(
    user: User,
    uuid: string,
    body: Omit<Assignment, "uuid">,
  ): Promise<Assignment> {
    const assignment = await this.assertCanManageAssignment(user, uuid);

    if (body.courseUuid !== assignment.courseUuid) {
      throw new Error("Cannot move assignment to another course");
    }

    const updated = await this.assignmentRepo.update(uuid, {
      title: body.title,
      body: body.body,
      dueAt: body.dueAt,
      lateSubmissionsAllowed: body.lateSubmissionsAllowed,
    });

    this.logger.log(`Assignment updated: ${uuid}`);
    return updated;
  }

  async delete(user: User, uuid: string): Promise<void> {
    const assignment = await this.assertCanManageAssignment(user, uuid);

    // Delete all associated attachments first.
    for (const attachment of assignment.attachments) {
      await this.attachmentRepo.delete(attachment.uuid);
    }

    await this.assignmentRepo.delete(uuid);

    this.logger.log(`Assignment deleted: ${uuid}`);
  }

  async get(user: User, uuid: string): Promise<Assignment> {
    const assignment = await this.assignmentRepo.get(uuid);

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    const course = await this.courseRepo.get(assignment.courseUuid);
    const isUserOwner = course.ownerUuid === user.uuid;

    if (user.type === "Teacher" && isUserOwner) {
      throw new Error("Unauthorized");
    }

    return assignment;
  }

  async getByCourse(user: User, courseUuid: string): Promise<Assignment[]> {
    const course = await this.courseRepo.get(courseUuid);

    if (!course) {
      throw new Error("Course not found");
    }

    const isUserOwner = course.ownerUuid === user.uuid;

    if (user.type === "Teacher" && !isUserOwner) {
      throw new Error("Unauthorized");
    }

    return this.assignmentRepo.getByCourse(courseUuid);
  }

  /*
  async getUnsubmitted(user: User): Promise<Assignment[]> {
    if (user.type !== "Student") {
      throw new Error("Only students can use this operation");
    }
  }
  */
}
