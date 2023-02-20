import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PostModule } from "./post/post.module";
import { MailModule } from './mail/mail.module';
import * as Joi from "joi";

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: "postgres",
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_DATABASE"),

    entities: ["dist/**/*.entity.js"],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test", "provision")
          .default("development"),
        PORT: Joi.number().default(3000),
        SWAGGER_USER: Joi.string(),
        SWAGGER_PASSWORD: Joi.string(),        
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_DATABASE: Joi.string(),
        JWT_ACCESS_SECRET: Joi.string(),
        JWT_ACCESS_EXPIRESIN: Joi.string(),
        JWT_REFRESH_SECRET: Joi.string(),
        JWT_REFRESH_EXPIRESIN: Joi.string(),
      }),
    }),

    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    AuthModule,
    PostModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
