import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entity/user.entity";
import { UsersRepository } from "./users.repository";
import * as bcrypt from "bcrypt";
import { MailService } from "src/mail/mail.service";

export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UsersRepository,
    private readonly mailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const originUser: User = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (originUser) {
      throw new HttpException("email is duplicated", HttpStatus.CONFLICT);
    }

    if(!this.mailService.sendMailToUser(createUserDto.email)){
      throw new HttpException("unable to send mail", HttpStatus.CONFLICT);
    }

    const password = await bcrypt.hash(createUserDto.password, 10);

    const user: User = this.userRepository.create({
      ...createUserDto,
      password,
    });
    return await this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch {
      throw new HttpException("serverError", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // findOne(email: string, password: string) {
  //   // return `This action returns all users`;
  //   return this.userRepository.find({
  //     where: { email: email, password: password },
  //   });
  // }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({
      id: id,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateRefreshToken(id: string, user: User) {
    this.userRepository.update(id, user);
  }
}
