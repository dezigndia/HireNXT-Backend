import { Request } from "express";
import { IUser } from "./User";

export interface IAuthRequest extends Request {
  user: IUser
}