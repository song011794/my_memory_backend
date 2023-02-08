import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsString, IsUUID } from "class-validator";
import { number } from "joi";
import { User } from "src/users/entity/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "post",
})
export class Post {
  @ApiProperty({
    type: String,
    description: "게시물 일련번호",
  })
  @IsUUID()
  @PrimaryGeneratedColumn("uuid", { comment: "게시물 일련번호" })
  id: string;

  @ApiProperty({
    type: String,
    description: "게시물 제목",
  })
  @IsString()
  @Column({ type: "varchar", comment: "게시물 제목" })
  title: string;

  @ApiProperty({
    type: String,
    description: "게시물 내용",
  })
  @IsString()
  @Column({ type: "text", comment: "게시물 내용" })
  content: string;

  @ApiProperty({
    type: String,
    description: "게시물 일련번호",
  })
  @IsString()
  @Column({ type: "bigint", comment: "조회 수" })
  view: string;

  @ApiProperty({
    type: Date,
    description: "등록 일시",
  })
  @CreateDateColumn({ type: "timestamptz", comment: "등록 일시" })
  reg_dt: Date;

  @ApiProperty({
    type: Date,
    description: "추억 일자",
  })
  @IsDate()
  @Column({ type: "timestamptz", comment: "추억 일자" })
  mem_dt: Date;

  @ApiProperty({
    type: Array,
    description: "GPS",
  })
  @IsArray()
  @Column({ type: "point", comment: "GPS" })
  gps: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  user: User;
}
