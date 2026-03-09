import { IsString, IsNotEmpty } from 'class-validator';

export class AnswerQuestionDto {
  @IsString()
  @IsNotEmpty({ message: 'userId é obrigatório' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'questionId é obrigatório' })
  questionId: string;

  @IsString()
  @IsNotEmpty({ message: 'answer é obrigatório' })
  answer: string;
}