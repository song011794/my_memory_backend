import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        pool : true,      
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        requireTLS: true,
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.MAIL_USER,                    
          clientId: process.env.MAIL_CLIENT_ID,
          clientSecret: process.env.MAIL_CLIENT_SECRET,          
          refreshToken: process.env.MAIL_REFRESH_TOKEN,
        },
        tls: {
          ciphers: "SSLv3",
        },
      },      
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
