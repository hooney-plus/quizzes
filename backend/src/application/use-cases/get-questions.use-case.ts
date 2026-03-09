import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../../domain/repositories/question.repository';
import { Question } from '../../domain/entities/question.entity';

@Injectable()
export class GetQuestionsUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(count = 10): Promise<Question[]> {
    return this.questionRepository.findRandom(count);
  }
}
