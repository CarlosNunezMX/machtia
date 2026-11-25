import { DrizzleRepo } from "infrastructure/shared/DrizzleRepo";
import { ICourseRepo } from "./ICourseRepo";
import { Course } from "models/course";
import {
  courseEnrollmentTable,
  courseTable,
  scheduleTable,
} from "providers/database/schema";
import { CourseSchedule } from "models/courseSchedule";
import { eq, getTableColumns } from "drizzle-orm";

export class DrizzleCourseRepo extends DrizzleRepo implements ICourseRepo {
  private mapCourses(
    rows: {
      uuid: string;
      ownerUuid: string;
      name: string;
      description: string;
      startDate: Date;
      endDate: Date;
      schedule: typeof scheduleTable.$inferSelect | null;
    }[],
  ): Course[] {
    const courses = new Map<string, (typeof rows)[number]>();
    const schedules = new Map<string, CourseSchedule[]>();

    for (const row of rows) {
      const { schedule, ...course } = row;

      if (!courses.has(course.uuid)) {
        courses.set(course.uuid, course);
        schedules.set(course.uuid, []);
      }

      if (schedule) {
        schedules
          .get(course.uuid)!
          .push(
            new CourseSchedule(
              schedule.courseUuid,
              schedule.uuid,
              schedule.start,
              schedule.end,
              schedule.weekdays,
              schedule.classroom,
            ),
          );
      }
    }

    return [...courses.entries()].map(
      ([uuid, course]) =>
        new Course(
          course.uuid,
          course.ownerUuid,
          course.name,
          course.description,
          schedules.get(uuid)!,
          course.startDate,
          course.endDate,
        ),
    );
  }
  async create(body: Course): Promise<Course> {
    const [course] = await this.client
      .insert(courseTable)
      .values({
        name: body.name,
        description: body.description,
        endDate: body.endDate,
        startDate: body.startDate,
        ownerUuid: body.ownerUuid,
      })
      .returning()
      .execute();

    const schedules = await this.client
      .insert(scheduleTable)
      .values(
        body.schedule.map((item) => ({
          classroom: item.classroom,
          end: item.end,
          start: item.start,
          weekdays: item.weekdays,
          courseUuid: item.courseUuid,
          uuid: item.uuid,
        })),
      )
      .returning()
      .execute();
    if (!course || schedules.length == 0) throw "";
    return new Course(
      course.uuid,
      course.ownerUuid,
      course.name,
      course.description,
      schedules.map(
        (item) =>
          new CourseSchedule(
            item.courseUuid,
            item.uuid,
            item.start,
            item.end,
            item.weekdays,
            item.classroom,
          ),
      ),
      course.startDate,
      course.endDate,
    );
  }

  async delete(uuid: string): Promise<void> {
    await this.client.delete(courseTable).where(eq(courseTable.uuid, uuid));
  }

  async getByUser(user: string): Promise<Course[]> {
    const rows = await this.client
      .select({
        ...getTableColumns(courseTable),
        schedule: scheduleTable,
      })
      .from(courseEnrollmentTable)
      .innerJoin(
        courseTable,
        eq(courseEnrollmentTable.courseUuid, courseTable.uuid),
      )
      .leftJoin(scheduleTable, eq(courseTable.uuid, scheduleTable.courseUuid))
      .where(eq(courseEnrollmentTable.userUuid, user));

    return this.mapCourses(rows);
  }

  async getByOwner(ownerUuid: string): Promise<Course[]> {
    const rows = await this.client
      .select({
        ...getTableColumns(courseTable),
        schedule: scheduleTable,
      })
      .from(courseTable)
      .leftJoin(scheduleTable, eq(courseTable.uuid, scheduleTable.courseUuid))
      .where(eq(courseTable.uuid, ownerUuid));

    return this.mapCourses(rows);
  }
}
