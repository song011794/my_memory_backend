import { Module } from "@nestjs/common";
import { AuthcodeService } from "./authcode.service";
import { AuthcodeController } from "./authcode.controller";
import { MailModule } from "src/mail/mail.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Authcode } from "./entities/authcode.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Authcode]),    
    MailModule,
  ],
  controllers: [AuthcodeController],
  providers: [AuthcodeService],
  exports: [AuthcodeService],
})
export class AuthcodeModule {}
