import { useState, useCallback } from 'react';
import { Question, Player, AnswerResult, QuizStats } from '../types';
import { getQuestions, answerQuestion } from '../services/api';

export function useQuiz(player: Player | null) {
  const [questions, setQuestions]       = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastResult, setLastResult]     = useState<AnswerResult | null>(null);
  const [xp, setXp]                     = useState(player?.xp ?? 0);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [phase, setPhase]               = useState<'idle' | 'answering' | 'feedback' | 'finished'>('idle');
  const [stats, setStats]               = useState<QuizStats>({ correct: 0, wrong: 0, timedOut: 0, streak: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startQuiz = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const qs = await getQuestions(10);
      setQuestions(qs);
      setCurrentIndex(0);
      setLastResult(null);
      setStats({ correct: 0, wrong: 0, timedOut: 0, streak: 0 });
      setPhase('answering');
    } catch {
      setError('Não foi possível carregar as perguntas. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (answer: string, timedOut = false) => {
    if (!player || phase !== 'answering' || isSubmitting) return;
    setIsSubmitting(true);

    const q = questions[currentIndex];
    try {
      const result = await answerQuestion(player.id, q.id, answer);
      const finalResult: AnswerResult = { ...result, timedOut };
      setLastResult(finalResult);
      setXp(result.newXp);
      setStats((prev: QuizStats) => ({
        correct:  prev.correct  + (result.isCorrect ? 1 : 0),
        wrong:    prev.wrong    + (!result.isCorrect && !timedOut ? 1 : 0),
        timedOut: prev.timedOut + (timedOut ? 1 : 0),
        streak:   result.isCorrect ? prev.streak + 1 : 0,
      }));
      setPhase('feedback');
    } catch {
      const fallback: AnswerResult = {
        isCorrect: false, xpChange: -15, newXp: xp - 15,
        correctAnswer: q.options[0], timedOut,
      };
      setLastResult(fallback);
      setXp((prev: number) => prev - 15);
      setStats((prev: QuizStats) => ({ ...prev, wrong: prev.wrong + 1, streak: 0 }));
      setPhase('feedback');
    } finally {
      setIsSubmitting(false);
    }
  }, [player, questions, currentIndex, phase, isSubmitting, xp]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setPhase('finished');
    } else {
      setCurrentIndex((i: number) => i + 1);
      setLastResult(null);
      setPhase('answering');
    }
  }, [currentIndex, questions.length]);

  return {
    questions, currentIndex,
    currentQuestion: questions[currentIndex] ?? null,
    lastResult, xp, isLoading, error, phase, stats, isSubmitting,
    startQuiz, submitAnswer, nextQuestion,
  };
}
