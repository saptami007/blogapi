import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import config from '../config/keys';
import { JwtStrategy } from '../utils/jwt.strategy';
import { GoogleStrategy } from '../utils/google.strategy';

@Module({
  imports:[JwtModule.register({
    secret:config.jwtKey,
    signOptions:{expiresIn:'600s'}
  })], 
  providers: [AuthService,JwtStrategy,GoogleStrategy],
  exports:[AuthService]
})
export class AuthModule {}
