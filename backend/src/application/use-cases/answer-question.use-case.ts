import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { QuestionRepository } from '../../domain/repositories/question.repository';
import { AnswerRepository } from '../../domain/repositories/answer.repository';

export interface AnswerQuestionInput {
  userId: string;
  questionId: string;
  answer: string;
}

export interface AnswerQuestionOutput {
  isCorrect: boolean;
  xpChange: number;
  newXp: number;
  correctAnswer: string;
}

@Injectable()
export class AnswerQuestionUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}

  async execute(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) throw new NotFoundException('Player not found');

    const question = await this.questionRepository.findById(input.questionId);
    if (!question) throw new NotFoundException('Question not found');

    const isCorrect = question.checkAnswer(input.answer);
    const xpChange = user.applyXpChange(isCorrect);

    await this.userRepository.updateXp(user.id, user.xp);

    await this.answerRepository.save({
      userId: user.id,
      questionId: question.id,
      answer: input.answer,
      isCorrect,
      xpChange,
    });

    return { isCorrect, xpChange, newXp: user.xp, correctAnswer: question.correctAnswer };
  }
}
