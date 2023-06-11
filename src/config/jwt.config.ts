/* eslint-disable prettier/prettier */
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'kodeRahasia',
  signOptions: {
    expiresIn: 60,
  },
};
