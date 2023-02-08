import { Controller, Post, UseGuards, Body, Get, Req } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { RefreshAuthGuard } from "./jwt/jwt.refresh.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post("signin")
  async login(@Body() data: LoginUserDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshAuthGuard)
  @Get("refresh")
  async refreshTokens(@Req() req: Request) {
    const userId = req.user["sub"];
    console.log(userId);

    const refreshToken = req.user["refreshToken"];
    console.log(refreshToken);

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
