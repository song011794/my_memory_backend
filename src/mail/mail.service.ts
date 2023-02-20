import { ConflictException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailToUser(email: string): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_USER,
        subject: "Hello",
        //text: "Hello World",
        html: "<b>Hello World</b>",
      });

      return true;
    } catch (error) {
      new ConflictException(error);
    }

    return false;
  }
}
