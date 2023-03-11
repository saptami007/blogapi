import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
async canActivate(context: ExecutionContext): Promise<any>{
    let request=context.switchToHttp().getRequest();
    if(request.url.startsWith('/login')){
        return true;
    }else{
        return super.canActivate(context);
        
    }

    throw new UnauthorizedException();
    
}

}