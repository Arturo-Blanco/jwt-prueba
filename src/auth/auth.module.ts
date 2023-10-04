import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: "LA PALABRA SECRETA O EL SECRETO ES QUE SON SECRETAS LAS VUELTAS DE LA VIDA QUE DAN LAS CLASES DE PROGRAMACION",
            signOptions: { expiresIn: "1d" }
        }),
        UserModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
