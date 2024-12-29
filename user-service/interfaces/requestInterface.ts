import { User } from "./userInterface";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user: User;
}