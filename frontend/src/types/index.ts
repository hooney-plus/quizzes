export interface Question {
  id: string;
  text: string;
  options: string[];
  category: string;
  difficulty: string;
}

export interface Player {
  id: string;
  nickname: string;
  xp: number;
}

export interface AnswerResult {
  isCorrect: boolean;
  xpChange: number;
  newXp: number;
  correctAnswer: string;
  timedOut?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  nickname: string;
  xp: number;
}

export interface QuizStats {
  correct: number;
  wrong: number;
  timedOut: number;
  streak: number;
}
