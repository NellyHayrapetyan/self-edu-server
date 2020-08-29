import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { JwtStrategy } from './jwt.strategy';
import { NodemailerModule } from '@iaminfinity/nodemailer';

@Module({
  imports: [
    NodemailerModule.register({
      host: 'smtp.gmail.com',
      port: 587,
      secure:  false,
      auth: {
        user: 'selfeducationdiploma@gmail.com',
        pass: 'herokudeploy1?',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
