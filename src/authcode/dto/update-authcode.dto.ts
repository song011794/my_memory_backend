import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthcodeDto } from './create-authcode.dto';

export class UpdateAuthcodeDto extends PartialType(CreateAuthcodeDto) {}
