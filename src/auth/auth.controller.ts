import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/refresh-acces-token.dto';
import { LoginResponse } from './interface/login-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() logiDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(logiDto);
  }
}
