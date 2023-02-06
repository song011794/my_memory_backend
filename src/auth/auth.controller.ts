import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    // @UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() data : LoginUserDto) {
    //   return this.authService.login(req.user);
    console.log(data);
    
    return this.authService.jwtLogin(data);
    }
  }