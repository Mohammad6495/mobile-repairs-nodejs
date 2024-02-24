import { Types } from "mongoose"

export interface IUser {
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

