import { Types } from "mongoose";
import CategoryRepository from "../database/all_Repository/category_Repository";

import {
  FormateData,
} from "../utils/utility";


class CategoryServices {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  async CreatedCategory(title: string, image:string) {
    const createdCategory = await this.repository.Created({ title, image });
    return FormateData({ data: createdCategory.toObject({ getters: true }) });
  }

  async EditCategory(title: string, id: string, image:string) {
    const editCategory = await this.repository.Edit({ title, id: id, image });
    return FormateData({ data: editCategory.toObject({ getters: true }) });
  }
  async GetCategory(currentPage: string, pageSize: string, search: string) {
    const getCategory = await this.repository.Get({ currentPage, pageSize, search });
    return FormateData({ data: getCategory });
  }
  async GetCategoryClient() {
    const getCategory = await this.repository.GetAll()
    return FormateData({ data: getCategory.map(item => item.toObject({ getters: true })) });
  }
  async ChangeIsAvailable(id: Types.ObjectId) {
    const data = await this.repository.ChangeIsAvailable({ id });
    return FormateData({ data: data });
  }
  async DeleteCategory(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
}

export default CategoryServices;
