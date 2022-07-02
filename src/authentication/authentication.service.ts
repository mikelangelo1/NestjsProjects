import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';


@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    public async register(registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        
        try {
            const createdUser = await this.userService.create({
                ...registerationData,
                password: hashedPassword,
            })
        } catch(error) {

        }
    }
}
