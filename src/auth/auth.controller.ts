import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDetailsDto } from './dto/user-details.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }
  //
  // @Post('/create-user')
  // createUser(@Body(ValidationPipe) userDetailsDto: UserDetailsDto) {
  //   return this.authService.createUser(userDetailsDto);
  // }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/logout')
  logOut() {
    return this.authService.logOut();
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test() {
    return console.log('yo');
  }
}
