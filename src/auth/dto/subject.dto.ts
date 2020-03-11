import { IsEmail, IsString, MinLength } from 'class-validator';

export class SubjectDto {
  @IsEmail()
  title: string;

  @IsString()
  name: string;
}
