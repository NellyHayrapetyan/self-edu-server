import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IsNull } from 'typeorm';
import { UserDetailsDto } from './user-details.dto';

export class AuthCredentialsDto extends UserDetailsDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message: 'password is weak'},
  )
  password: string;

  @IsString()
  @MinLength(8)
  oneTimePassword: string;
}
