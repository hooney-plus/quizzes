import React, { useEffect, useState } from 'react';
import { AnswerResult } from '../types';

interface Props { result: AnswerResult; streak: number; onNext: () => void; }

export function FeedbackOverlay({ result, streak, onNext }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(onNext, 2200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const { isCorrect, xpChange, correctAnswer, timedOut } = result;

  const icon  = timedOut ? '⏱' : isCorrect ? '✓' : '✗';
  const label = timedOut ? 'Tempo esgotado!' : isCorrect ? 'Resposta correta!' : 'Resposta errada';
  const cls   = isCorrect ? 'success' : timedOut ? 'timeout' : 'error';

  return (
    <div className="overlay anim-fadein" onClick={onNext} style={{ cursor: 'pointer' }}>
      <div className={`feedback-card anim-pop ${cls}`}>
        <div style={{ fontSize: '44px', marginBottom: '10px' }}>{icon}</div>

        <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {label}
        </p>

        <p style={{ fontSize: '30px', fontWeight: '800', color: isCorrect ? 'var(--success)' : 'var(--error)', marginBottom: 0 }}>
          {xpChange > 0 ? '+' : ''}{xpChange} XP
        </p>

        {!isCorrect && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '14px' }}>
            Correto: <strong style={{ color: 'var(--text-primary)' }}>{correctAnswer}</strong>
          </p>
        )}

        {isCorrect && streak >= 2 && (
          <div style={{ marginTop: '14px' }}>
            <span className="streak-badge anim-streak">🔥 {streak}x sequência!</span>
          </div>
        )}

        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '18px' }}>
          clique para continuar
        </p>
      </div>
    </div>
  );
}
