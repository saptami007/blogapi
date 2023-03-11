import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginResponse } from './models/login.response';

@Injectable()
export class LoginService {

    constructor(private authService: AuthService) {

    }
    async doLogin(request: any): Promise<LoginResponse> {
        if (request) {
            return await this.authService.login(request)
        }else{
            throw new UnauthorizedException();
        }

    }
}
