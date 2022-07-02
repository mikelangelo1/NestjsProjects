import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthService){}

    
}
