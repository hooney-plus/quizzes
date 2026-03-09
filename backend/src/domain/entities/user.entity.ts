export class User {
  constructor(
    public readonly id: string,
    public nickname: string,
    public xp: number,
    public readonly createdAt: Date,
  ) {}

  applyXpChange(isCorrect: boolean): number {
    const change = isCorrect ? 50 : -15;
    this.xp += change;
    return change;
  }

  get rank(): string {
    if (this.xp >= 500) return 'Expert';
    if (this.xp >= 200) return 'Avançado';
    if (this.xp >= 50) return 'Intermediário';
    return 'Iniciante';
  }
}
