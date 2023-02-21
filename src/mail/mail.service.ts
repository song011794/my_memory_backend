import { ConflictException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCodeMail(email: string, code : string): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_USER,
        subject: "추억 쌓기 회원가입 코드 안내",        
        html: `Code : <b>${code}</b>`,
      });

      return true;
    } catch (error) {
      new ConflictException(error);
    }

    return false;
  }
}
