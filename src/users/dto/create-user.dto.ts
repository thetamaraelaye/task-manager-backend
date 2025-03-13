/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
