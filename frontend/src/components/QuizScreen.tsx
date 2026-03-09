import React, { useEffect, useRef, useState } from 'react';
import { Player } from '../types';
import { useQuiz } from '../hooks/useQuiz';
import { XpBar } from './XpBar';
import { QuestionCard } from './QuestionCard';
import { FeedbackOverlay } from './FeedbackOverlay';

const TIMER_SECONDS = 20;

interface Props { player: Player; onFinish: (xp: number, stats: import('../types').QuizStats) => void; }

export function QuizScreen({ player, onFinish }: Props) {
  const {
    currentQuestion, currentIndex, questions,
    lastResult, xp, isLoading, error, phase, stats,
    startQuiz, submitAnswer, nextQuestion,
  } = useQuiz(player);

  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null);
  const didTimeoutRef           = useRef(false);

  useEffect(() => { startQuiz(); }, []);
  useEffect(() => { if (phase === 'finished') onFinish(xp, stats); }, [phase]);

  // Timer por pergunta
  useEffect(() => {
    if (phase !== 'answering') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setTimeLeft(TIMER_SECONDS);
    didTimeoutRef.current = false;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (!didTimeoutRef.current) {
            didTimeoutRef.current = true;
            submitAnswer('__timeout__', true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, currentIndex]);

  if (error) {
    return (
      <div className="card anim-fadeup" style={{ maxWidth: 420, padding: '32px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
        <div className="error-banner" style={{ marginBottom: 20 }}>{error}</div>
        <button className="btn btn-primary" onClick={startQuiz}>Tentar novamente</button>
      </div>
    );
  }

  if (isLoading || !currentQuestion) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div className="anim-spin" style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto 12px' }} />
        <p style={{ fontSize: '14px' }}>Carregando perguntas...</p>
      </div>
    );
  }

  const total      = questions.length;
  const progress   = ((currentIndex + 1) / total) * 100;
  const timerPct   = (timeLeft / TIMER_SECONDS) * 100;
  const timerClass = timeLeft > 10 ? 'safe' : timeLeft > 5 ? 'warning' : 'danger';

  return (
    <div style={{ width: '100%', maxWidth: '560px' }}>
      <XpBar xp={xp} nickname={player.nickname} streak={stats.streak} />

      {/* Progresso + timer */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div className="progress-track" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {currentIndex + 1} / {total}
          </span>
          <span style={{
            fontSize: '13px', fontWeight: 700, minWidth: 28, textAlign: 'right',
            color: timerClass === 'danger' ? 'var(--error)' : timerClass === 'warning' ? 'var(--gold)' : 'var(--success)',
          }}>
            {timeLeft}s
          </span>
        </div>
        <div className="timer-track">
          <div className={`timer-fill ${timerClass}`} style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        onAnswer={(ans: string) => submitAnswer(ans, false)}
        disabled={phase !== 'answering'}
        result={lastResult}
      />

      {phase === 'feedback' && lastResult && (
        <FeedbackOverlay result={lastResult} streak={stats.streak} onNext={nextQuestion} />
      )}
    </div>
  );
}
