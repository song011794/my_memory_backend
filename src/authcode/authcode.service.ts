import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { CreateAuthcodeDto } from "./dto/create-authcode.dto";
import { UpdateAuthcodeDto } from "./dto/update-authcode.dto";
import { Authcode } from "./entities/authcode.entity";

@Injectable()
export class AuthcodeService {
  constructor(
    private readonly mailService: MailService,
    @InjectRepository(Authcode)
    private authCodeRepository: Repository<Authcode>,
    
  ) {}

  async create(createAuthcodeDto: CreateAuthcodeDto) {
    const code: string = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      "0"
    );

    const data =  {...createAuthcodeDto , code : code};

    const authcode: Authcode =
      this.authCodeRepository.create(data);

    await this.authCodeRepository.save(authcode);

    return this.mailService.sendCodeMail(createAuthcodeDto.email, code);
  }

  findAll() {
    return `This action returns all authcode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authcode`;
  }

  update(id: number, updateAuthcodeDto: UpdateAuthcodeDto) {
    return `This action updates a #${id} authcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} authcode`;
  }
}
