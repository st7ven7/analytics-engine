import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    async login(loginDto: LoginDto){
        const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
        const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    
        if(
            loginDto.username !== adminUsername ||
            loginDto.password !== adminPassword
        ){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: 'admin',
            username: loginDto.username,
        };

        const token = this.jwtService.sign(payload);

        return{
            accessToken: token,
        };

    }
}