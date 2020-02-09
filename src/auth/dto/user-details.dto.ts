import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDetailsDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  role: string;
}
