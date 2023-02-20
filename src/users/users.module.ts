import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entity/user.entity";
import { TypeOrmExModule } from "typeorm/typeorm.module";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { MailService } from "src/mail/mail.service";
import { MailModule } from "src/mail/mail.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UsersRepository]),
    forwardRef(() => AuthModule),
    MailModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,    
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
