import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async register(registerDTO: RegisterDTO): Promise<any> {
        const user = await this.userService.findByEmail(registerDTO.email)
        if (user) {
            throw new Error('El usuario ya existe.')
        }
        const encrypted_pass = await bcrypt.hash(registerDTO.password, 10)
        const newUser = new User(registerDTO.email, encrypted_pass, registerDTO.username)
        return await this.userService.createUser(newUser)
    }

    async login({ email, password }: LoginDTO): Promise<any> {
        try {
            const user: User = await this.userService.findByEmail(email);

            if (!user) {
                throw new UnauthorizedException('Usuario incorrecto.');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new UnauthorizedException('Password incorrecta.');
            }
            const payload = { email: user.email}
            const token = await this.jwtService.signAsync(payload);

            return token;

        } catch (error) {
            console.error(error);
        }
    }
}
