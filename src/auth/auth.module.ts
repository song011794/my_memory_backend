import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";

import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { RefreshTokenStrategy } from "./jwt/jwt.refresh.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
