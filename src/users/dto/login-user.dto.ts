import { PickType } from "@nestjs/swagger";
import { User } from "../entity/user.entity";

export class LoginUserDto extends PickType(User, [
  "email",
  "password",
] as const) {}
