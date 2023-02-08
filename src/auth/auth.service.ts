import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { User } from "src/users/entity/user.entity";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,    
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const user: User = await this.userService.create(createUserDto);

    const tokens = await this.getTokens(user.email, user.id);
    const userWithToken = { ...user, refreshToken: tokens.refreshToken };
    this.userService.updateRefreshToken(user.id, userWithToken);

    return tokens;
  }

  async signIn(data: LoginUserDto) {
    const { email, password } = data;

    const user: User = await this.validateUser(email, password);

    if (user) {
      const tokens = await this.getTokens(user.email, user.id);
      const userWithToken = { ...user, refreshToken: tokens.refreshToken };
      this.userService.updateRefreshToken(user.id, userWithToken);
      return tokens;
    } else {
      throw new UnauthorizedException();
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findByEmail(email);

    const passwordMatches = bcrypt.compareSync(password, user.password);
    if (!passwordMatches) throw new HttpException("", HttpStatus.UNAUTHORIZED);

    if (user) {
      return user;
    }

    throw new HttpException("", HttpStatus.UNAUTHORIZED);
  }

  async getTokens(email: string, id: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          email: email,
          sub: id,
        },
        {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRESIN"),
        }
      ),
      this.jwtService.signAsync(
        {
          email: email,
          sub: id,
        },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRESIN"),
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user: User = await this.userService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException("Access Denied");
    const refreshTokenMatches = !user.refreshToken.localeCompare(refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");
    const tokens = await this.getTokens(user.email, user.id);
    const userWithToken = { ...user, refreshToken: tokens.refreshToken };
    this.userService.updateRefreshToken(user.id, userWithToken);
    return tokens;
  }
}
