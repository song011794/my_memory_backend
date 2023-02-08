import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";

import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "src/users/users.repository";
import { TypeOrmExModule } from "typeorm/typeorm.module";
import { RefreshTokenStrategy } from "./jwt/jwt.refresh.strategy";

@Module({
  imports: [
   ConfigModule.forRoot({ isGlobal: true }),
   
     forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({}),
    TypeOrmExModule.forCustomRepository([UsersRepository])
  ],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
