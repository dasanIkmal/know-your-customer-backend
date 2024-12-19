import { Document, Schema } from "mongoose";
import { UserRole } from "../enums/useRole.enum";

// User interface for the Mongoose model
export interface IUser extends Document<string> {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdDate: Date;
  updatedDate: Date;
}
