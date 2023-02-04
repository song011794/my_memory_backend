import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Document, HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @ApiProperty({
    type: String,
    description : '유저 ID'
  })
  @Prop({ type: Types.ObjectId })
  @IsString()
  id: Types.ObjectId;

  @ApiProperty({
    required: true,
    description : '유저 이름',
    type: String,
  })
  @Prop()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    description : '유저 이메일',
    type: String,
  })
  @IsString()
  @Prop()
  email: string;

  @ApiProperty({
    required: true,
    description : '유저 비밀번호',
    type: String,
  })
  @Prop()
  @IsString()
  password: string;

  @ApiProperty({
    required: false,
    description : '유저 이미지 URL',
    type: String,
  })
  @Prop()
  @IsString()
  imgUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
