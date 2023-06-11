import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule.register(jwtConfig), UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
