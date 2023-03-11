import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,Strategy} from 'passport-jwt'
import config from '../config/keys';

export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            secretOrKey:config.jwtKey,
            ignoreExpiration:false,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:any){
        return {
            id:payload.sub,
            name:payload.firstName
        }
    }
}