import { Types } from "mongoose"

export interface IUser {
  id?: Types.ObjectId,
  userName?: string;
  password?: string;
  role?: IRole[]
}

export interface IRole {
  id?: string,
  name?: string,
  label?: string
}

export interface ICategory {
  id?: string,
  title?: string
  image?: string
}

export interface ICourse {
  id: Types.ObjectId,
  title: string
  image?: string,
  description?: string,
  viewCount?: number,
  price: number,
  courseLevel: number,
  courseStatus: number,
  teacher: string,
  isActive: boolean,
  isAvailable: boolean,
  isFree: boolean,
  category: Types.ObjectId,
  headLines: Types.ObjectId[]
}

export interface IHeadLine {
  id?: Types.ObjectId,
  title: string
  description?: string,
  isActive?: boolean,
  isAvailable?: boolean,
  eductionals?: Types.ObjectId[],
  course?: Types.ObjectId
}

export interface IHeadLine {
  id?: Types.ObjectId,
  title: string
  description?: string,
  isActive?: boolean,
  isAvailable?: boolean,
  eductionals?: Types.ObjectId[],
  course?: Types.ObjectId
}
export interface IEductionalVideo {
  id?: Types.ObjectId,
  title: string
  isActive?: boolean,
  isAvailable?: boolean,
  isPayActive?: boolean,
  videoTime: number,
  headLine?: Types.ObjectId
}

export interface IOrder {
  id?: string,
  totalPrice: number,
  isActive?: boolean,
  isAvailable?: boolean,
  isPay?: boolean,
  user?: Types.ObjectId,
  licenceKey?: string,
  resnumber:string
  course: Types.ObjectId[]
}