export interface SaveAnswerData {
  userId: string;
  questionId: string;
  answer: string;
  isCorrect: boolean;
  xpChange: number;
}

export abstract class AnswerRepository {
  abstract save(data: SaveAnswerData): Promise<void>;
}
