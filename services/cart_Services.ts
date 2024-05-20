import { Types } from "mongoose";
import Order from '../database/models/order_collection'
import User from '../database/models/user_collection'
import CourseRepository from '../database/all_Repository/course_Repository';
import OrderRepository from '../database/all_Repository/order_Repository';
import {
  FormateData,
} from "../utils/utility";
import { IUser } from "../utils/interfaces";
import ZarinpalCheckout from '../config/zarinpal'

type IItems = {
  productId: Types.ObjectId,
  productCount: number,
}

class CartServices {
  private coursRepository: CourseRepository;
  private orderRepository: OrderRepository;

  constructor() {
    this.coursRepository = new CourseRepository();
    this.orderRepository = new OrderRepository();
  }

  async GetFactor(items: IItems[]) {
    let productList: any = [];
    let finalPrice = 0;
    for (const item of items) {
      const findProduct = await this.coursRepository.Detail({ id: item.productId })
      productList.push({
        count: item?.productCount,
        productId: findProduct?._id,
        products: {
          id: findProduct?._id,
          title: findProduct.title,
          image: findProduct.image,
          count: item?.productCount,
          price: findProduct.price * item?.productCount,
          defautPrice: findProduct.price,
        },
      });
      finalPrice += findProduct.price * item?.productCount;
    }
    const finalData = {
      finalPrice,
      cartItems: productList,
    };

    return FormateData({ data: finalData });
  }

  async SubmitFactor(items: IItems[], user: IUser) {
    let finalPriceAllItems = 0;
    for (const item of items) {
      const findProduct = await this.coursRepository.Detail({ id: item.productId })
      finalPriceAllItems += findProduct.price * item?.productCount;
    }
    // f04b1ff3-5e1b-44f9-af3e-7b1e192f6ff9
    var zarinpal = ZarinpalCheckout.create('f04b1ff3-5e1b-44f9-af3e-7b1e192f6ff9', true);
    const response = await zarinpal.PaymentRequest({
      Amount: finalPriceAllItems,
      CallbackURL: 'http://localhost:6100/cart/callbackurl',
      Description: 'آموزشگاه تخصصی تعمیرات موبایل راموافزار',
      Mobile: user.userName
    })


    const addPayinfo = await this.orderRepository.Created({
      course: items.map(item => item.productId),
      user: user.id,
      totalPrice: finalPriceAllItems,
      resnumber: response.authority,
    })

    await addPayinfo.save();

    return FormateData({ data: { url: response.url } })
  }

  async callbackurl(Status: string, Authority: string, user: IUser) {
    const payment = await Order.findOne({ resnumber: Authority }).populate('course').exec();
    if (payment?.course.length == 0) {
      return FormateData({ data: null, message: 'دوره مورد نظر یافت نشد', statusCode: 422 })
    }

    if (Status && Status != 'OK') {
      return FormateData({ data: null, message: 'Not Ok', statusCode: 422 })
    }

   
    var zarinpal = ZarinpalCheckout.create('f04b1ff3-5e1b-44f9-af3e-7b1e192f6ff9', true);
 
    const response = await zarinpal.PaymentVerification({
      Amount: payment?.totalPrice,
      Authority: Authority     
    })

    if (response?.status == 101) {
      payment?.set({ isPay: true });
      await User.updateOne({ '_id': user?.id }, { $set: { orders: payment?.course.map(item => item) } });
      await payment?.save();
      return FormateData({ data: { url: 'https://caropastry.com' } })
    } else {
      return FormateData({ data: null, message: 'پرداخت ناموفق', statusCode: 500 })
    }

  }

}

export default CartServices;
