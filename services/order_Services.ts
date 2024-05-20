import { Types } from "mongoose";
import OrderRepository from "../database/all_Repository/order_Repository";

import {
  FormateData,
} from "../utils/utility";


class OrderServices {
  private repository: OrderRepository;

  constructor() {
    this.repository = new OrderRepository();
  }

  async GetOrder(currentPage: string, pageSize: string, search: string) {
    const getOrder = await this.repository.Get({ currentPage, pageSize, search });
    return FormateData({ data: getOrder });
  }
  async DetailOrder(id: Types.ObjectId) {
    const getOrder = await this.repository.Detail(id)
    return FormateData({ data: getOrder?.toObject({ getters: true }) });
  }
  
}

export default OrderServices;
