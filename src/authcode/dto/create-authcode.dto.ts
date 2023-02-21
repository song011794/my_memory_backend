import { PickType } from "@nestjs/swagger";
import { Authcode } from "../entities/authcode.entity";



export class CreateAuthcodeDto extends PickType(Authcode, [
  "email",
  "type",
] as const) {}
