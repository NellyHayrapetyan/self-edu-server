import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { NodemailerService } from '@iaminfinity/nodemailer';
import { MailerModule, MailerService } from '@nest-modules/mailer';
import { UserDetailsDto } from './dto/user-details.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto, oneTimePass: string): Promise<void> {
    const { email, firstName, lastName, role, password, oneTimePassword } = authCredentialsDto;

    if (oneTimePassword !== oneTimePass) {
      throw new ConflictException('Password is incorrect');
    }

    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserByUsername(email: string): Promise<User> {
    return await this.findOne({ email });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private sendEmail(email){

  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    if (user && await user.validatePassword(password)) {
      return user.email;
    } else {
      return null;
    }
  }
}
