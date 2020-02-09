import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { NodemailerService } from '@iaminfinity/nodemailer';
import { MailerService } from '@nest-modules/mailer';
import { UserDetailsDto } from './dto/user-details.dto';
import { v1 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  public oneTimePassword: string;

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private nodemailerService: NodemailerService,
  ) {}

  async createUser(userDetailsDto: UserDetailsDto) {
    const { email } = userDetailsDto;
    this.oneTimePassword = uuid();
    this.nodemailerService.sendMail({
        to: email,
        subject: 'Account confirmation',
        text: `One Time Password: ${this.oneTimePassword}`,
      })
      .then()
      .catch();
  }

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialsDto, this.oneTimePassword);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ user: User, accessToken }> {
    const email = await this.userRepository.validateUserPassword(authCredentialsDto);
    const user = await this.userRepository.getUserByUsername(email);

    if (!email) {
      throw new UnauthorizedException(('Invalid credentials'));
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return { user, accessToken };
  }
}
