import { Types } from "mongoose";
import CourseRepository from "../database/all_Repository/course_Repository";

import {
  FormateData,
} from "../utils/utility";
import { ICourse } from "../utils/interfaces";


class CourseServices {
  private repository: CourseRepository;

  constructor() {
    this.repository = new CourseRepository();
  }

  async CreatedCourse(input: ICourse) {
    const createdCourse = await this.repository.Created(input);
    return FormateData({ data: createdCourse.toObject({ getters: true }) });
  }

  async EditCourse(input: ICourse) {
    const editCourse = await this.repository.Edit(input);
    return FormateData({ data: editCourse.toObject({ getters: true }) });
  }
  async GetCourse(currentPage: string, pageSize: string, search: string) {
    const getCourse = await this.repository.Get({ currentPage, pageSize, search });
    return FormateData({ data: getCourse });
  }
  async GetCourseClient() {
    const getCourse = await this.repository.GetAll()
    return FormateData({ data: getCourse.map(item => item.toObject({ getters: true })) });
  }
  async ChangeIsAvailable(id: Types.ObjectId) {
    const data = await this.repository.ChangeIsAvailable({ id });
    return FormateData({ data: data });
  }
  async DeleteCourse(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
}

export default CourseServices;
