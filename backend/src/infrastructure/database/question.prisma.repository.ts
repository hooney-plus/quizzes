import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../../domain/repositories/question.repository';
import { Question } from '../../domain/entities/question.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class QuestionPrismaRepository implements QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(raw: any): Question {
    return new Question(raw.id, raw.text, raw.options, raw.correctAnswer, raw.category, raw.difficulty);
  }

  async findAll(): Promise<Question[]> {
    const rows = await this.prisma.question.findMany();
    return rows.map((r: any) => this.toEntity(r));
  }

  async findById(id: string): Promise<Question | null> {
    const raw = await this.prisma.question.findUnique({ where: { id } });
    return raw ? this.toEntity(raw) : null;
  }

  async findRandom(count: number): Promise<Question[]> {
    const all = await this.prisma.question.findMany();
    const shuffled = all.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((r: any) => this.toEntity(r));
  }
}
