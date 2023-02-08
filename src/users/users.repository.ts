import {  Repository } from "typeorm";
import { CustomRepository } from "typeorm/typeorm.decorator";
import { User } from "./entity/user.entity";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
    
}
