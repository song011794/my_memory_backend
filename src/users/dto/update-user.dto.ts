import { OmitType, PartialType } from "@nestjs/mapped-types";
import { User } from "../entity/user.entity";

export class UpdateUserDto extends OmitType(User, ["id", "email"] as const) {}
