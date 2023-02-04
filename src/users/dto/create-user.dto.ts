
import { OmitType } from '@nestjs/swagger';
import { User } from '../schema/user.schema';

export class CreateUserDto extends OmitType(User, ['id'] as const) {}
