/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class RefreshAccesTokenDto {
  @IsNotEmpty()
  refresh_token: string;
}
