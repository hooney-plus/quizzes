import { Injectable } from '@nestjs/common';
import { AnswerRepository, SaveAnswerData } from '../../domain/repositories/answer.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class AnswerPrismaRepository implements AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: SaveAnswerData): Promise<void> {
    await this.prisma.answer.create({ data });
  }
}
