import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthcodeService } from './authcode.service';
import { CreateAuthcodeDto } from './dto/create-authcode.dto';
import { UpdateAuthcodeDto } from './dto/update-authcode.dto';

@Controller('authcode')
export class AuthcodeController {
  constructor(private readonly authcodeService: AuthcodeService) {}

  @Post()
  create(@Body() createAuthcodeDto: CreateAuthcodeDto) {
    return this.authcodeService.create(createAuthcodeDto);
  }

  @Get()
  findAll() {
    return this.authcodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authcodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthcodeDto: UpdateAuthcodeDto) {
    return this.authcodeService.update(+id, updateAuthcodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authcodeService.remove(+id);
  }
}
