import { CreateUserDTO } from './../user/dto/user.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('register')
    async createUser(@Body() newUser) : Promise <CreateUserDTO> {
        return await this.authService.register(newUser);
    }

    @Post('login')
    async Login(@Body() loginDto : LoginDTO) : Promise <any> {
        return await this.authService.login(loginDto);
    }

    @Get('home')
    @UseGuards(AuthGuard)
    getHome() {
        return "Bienvenido al home"
    }
}
