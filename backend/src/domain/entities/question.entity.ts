export class Question {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly options: string[],
    public readonly correctAnswer: string,
    public readonly category: string,
    public readonly difficulty: string,
  ) {}

  checkAnswer(answer: string): boolean {
    return this.correctAnswer === answer;
  }
}
