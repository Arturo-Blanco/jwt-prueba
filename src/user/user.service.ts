import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    
    async createUser(userDTO : CreateUserDTO) : Promise <CreateUserDTO> {
        const user = new User(userDTO.email, userDTO.password, userDTO.username);
        return await this.userRepository.save(user);
    }

    async findByEmail(email: string) : Promise <User> {
        const criterian : FindOneOptions = { where : { email : email}}
        return await this.userRepository.findOne(criterian)
    }
}
