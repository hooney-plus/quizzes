import { Module } from '@nestjs/common';
import { QuizController } from '../controllers/quiz.controller';
import { GetQuestionsUseCase } from '../../application/use-cases/get-questions.use-case';
import { AnswerQuestionUseCase } from '../../application/use-cases/answer-question.use-case';
import { QuestionRepository } from '../../domain/repositories/question.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { AnswerRepository } from '../../domain/repositories/answer.repository';
import { QuestionPrismaRepository } from '../database/question.prisma.repository';
import { UserPrismaRepository } from '../database/user.prisma.repository';
import { AnswerPrismaRepository } from '../database/answer.prisma.repository';

@Module({
  controllers: [QuizController],
  providers: [
    GetQuestionsUseCase,
    AnswerQuestionUseCase,
    { provide: QuestionRepository, useClass: QuestionPrismaRepository },
    { provide: UserRepository, useClass: UserPrismaRepository },
    { provide: AnswerRepository, useClass: AnswerPrismaRepository },
  ],
})
export class QuizModule {}
