import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { SubjectRepository } from './subject.repository';
import { Subject } from './subject.entity';
import { SubjectDto } from '../dto/subject.dto';

@Injectable()
export class SubjectService {

  constructor(
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
  ) {}

  public async getAllSubjects(): Promise<Subject[]> {
    return await this.subjectRepository.getAllSubjects();
  }

  public async createSubject(subjectDto: SubjectDto): Promise<void> {
    return await this.subjectRepository.createSubject(subjectDto);
  }
}
