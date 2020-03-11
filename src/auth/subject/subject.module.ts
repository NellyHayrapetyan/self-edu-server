import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { NodemailerModule } from '@iaminfinity/nodemailer';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectRepository]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
