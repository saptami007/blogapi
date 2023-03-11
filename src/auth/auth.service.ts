import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '../login/models/login.response';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(user: any):Promise<LoginResponse> {
        if (user && user.firstName && user.email) {
            let loginResponse= new LoginResponse(user);
            
                loginResponse.accessToken= this.jwtService.sign({ firstName: user.firstName, sub: user.email })
            return loginResponse;
        }else{
            throw new UnauthorizedException();
        }

    }
}
