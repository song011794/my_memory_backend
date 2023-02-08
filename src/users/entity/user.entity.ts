import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "user",
})
export class User {
  @ApiProperty({
    type: String,
    description: "유저 일련번호",
    uniqueItems: true,
  })
  @IsUUID()
  @PrimaryGeneratedColumn("uuid", { comment: "유저 일련번호" })
  id: string;

  @ApiProperty({
    required: true,
    description: "유저 이름",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: "varchar", comment: "유저 이름" })
  name: string;

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
    description: "유저 비밀번호",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: "varchar", comment: "유저 비밀번호" })
  password: string;

  @ApiProperty({
    required: false,
    description: "유저 이미지 URL",
    type: String,
    nullable: true,
  })
  @Column({ type: "varchar", nullable: true, comment: "유저 이미지 URL" })
  imgUrl: string;

  @ApiProperty({
    required: true,
    description: "유저 가입일",
    type: Date,
  })
  @CreateDateColumn({ type: "timestamptz", comment: "유저 가입일" })
  join_dt: Date;

  @ApiProperty({
    required: false,
    description: "유저 가입일",
    type: String,
  })
  @Column({ type: "varchar", nullable: true, comment: "유저 RefreshToken" })
  refreshToken?: string;
}
