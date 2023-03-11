import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginService } from './login.service';
import { LoginRequest } from './models/login.request';
import { LoginResponse } from './models/login.response';


@Controller()
export class LoginController {
    constructor(private loginService:LoginService){

    }
    // @Get('login')
    // @UseGuards(AuthGuard('google'))
    // async login(@Req() req):Promise<any>{
    //     return await this.loginService.doLogin(req)
    // }

    // @Get('googleLogin')
    // @UseGuards(AuthGuard('google'))
    // async googleAuth(@Req() req){}

    @Post('login')
    async login(@Body() user:LoginRequest):Promise<LoginResponse>{
        return await this.loginService.doLogin(user);
    }
}
