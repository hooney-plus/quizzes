import { Question } from '../entities/question.entity';

export abstract class QuestionRepository {
  abstract findAll(): Promise<Question[]>;
  abstract findById(id: string): Promise<Question | null>;
  abstract findRandom(count: number): Promise<Question[]>;
}
