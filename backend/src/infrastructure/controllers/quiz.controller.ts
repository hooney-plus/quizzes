import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GetQuestionsUseCase } from '../../application/use-cases/get-questions.use-case';
import { AnswerQuestionUseCase } from '../../application/use-cases/answer-question.use-case';
import { AnswerQuestionDto } from '../dtos/answer-question.dto';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly getQuestionsUseCase: GetQuestionsUseCase,
    private readonly answerQuestionUseCase: AnswerQuestionUseCase,
  ) {}

  @Get('questions')
  async getQuestions(@Query('count') count = '10') {
    return this.getQuestionsUseCase.execute(Number(count));
  }

  @Post('answer')
  async answerQuestion(@Body() dto: AnswerQuestionDto) {
    return this.answerQuestionUseCase.execute(dto);
  }
}
