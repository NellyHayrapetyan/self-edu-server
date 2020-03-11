import { EntityRepository, Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { SubjectDto } from '../dto/subject.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {

  public async getAllSubjects(): Promise<Subject[]> {
    return await this.find();
  }

  public async createSubject(subjectDto: SubjectDto): Promise<void> {
    const { name, title } = subjectDto;
    const subject = new Subject();
    subject.name = name;
    subject.title = title;

    try {
      await subject.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
