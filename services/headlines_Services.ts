import { Types } from "mongoose";
import HeadlineRepository from "../database/all_Repository/headline_Repository";
import { IHeadLine } from "../utils/interfaces";

import {
  FormateData,
} from "../utils/utility";


class HeadlineServices {
  private repository: HeadlineRepository;

  constructor() {
    this.repository = new HeadlineRepository();
  }

  async CreatedHeadline({ title, course, description }: IHeadLine) {
    const createdHeadline = await this.repository.Created({ title, course, description });
    return FormateData({ data: createdHeadline.toObject({ getters: true }) });
  }

  async EditHeadline({ title, course, description, id }: IHeadLine) {
    const editHeadline = await this.repository.Edit({ id, title, description });
    return FormateData({ data: editHeadline.toObject({ getters: true }) });
  }
  async GetHeadline(currentPage: string, pageSize: string, search: string, courseId: Types.ObjectId) {
    const getHeadline = await this.repository.Get({ currentPage, pageSize, search,courseId });
    return FormateData({ data: getHeadline });
  }
  async GetHeadlineClient() {
    const getHeadline = await this.repository.GetAll()
    return FormateData({ data: getHeadline.map(item => item.toObject({ getters: true })) });
  }
  async ChangeIsAvailable(id: Types.ObjectId) {
    const data = await this.repository.ChangeIsAvailable({ id });
    return FormateData({ data: data });
  }
  async DeleteHeadline(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
}

export default HeadlineServices;
