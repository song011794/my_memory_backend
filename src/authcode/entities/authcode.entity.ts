import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "auth_code",
})
export class Authcode {
  @ApiProperty({
    type: String,
    description: "인증 코드 일련번호",
    uniqueItems: true,
  })
  @IsUUID()
  @PrimaryGeneratedColumn("uuid", { comment: "인증 코드 일련번호" })
  id: string;

  @ApiProperty({
    required: true,
    description: "유저 이메일",
    type: String,
    uniqueItems: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true, type: "varchar", comment: "유저 이메일" })
  email: string;

  @ApiProperty({
    required: true,
    description: "인증 코드",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: "varchar", comment: "인증 코드" })
  code: string;

  @ApiProperty({
    required: true,
    description: "인증 유형",
    type: Number,
  })
  @Column({ type: "int",  comment: "인증 유형" })
  type: number;

  @ApiProperty({
    required: true,
    description: "등록 일시",
    type: Date,
  })
  @CreateDateColumn({ type: "timestamptz",  comment: "등록 일시" })
  reg_dt: Date;

  @ApiProperty({
    required: true,
    description: "유효여부",
    type: Boolean,
    default: true,
  })
  @CreateDateColumn({ type: "boolean", comment: "유효 여부" , default : true})
  active: boolean;
}
