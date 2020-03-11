import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';
import { SubjectDto } from '../dto/subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(
    private subjectService: SubjectService,
  ) {}

  @Get('/all')
  getAllSubjects(): Promise<Subject[]> {
    return this.subjectService.getAllSubjects();
  }

  @Post('/create')
  create(@Body() subjectDto: SubjectDto): Promise<void> {
    return this.subjectService.createSubject(subjectDto);
  }
}
