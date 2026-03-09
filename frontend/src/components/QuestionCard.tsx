import React, { useState, useEffect, useCallback } from 'react';
import { Question, AnswerResult } from '../types';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  result: AnswerResult | null;
}

const DIFF_LABEL: Record<string, string> = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
const DIFF_COLOR: Record<string, string> = { easy: '#10b981', medium: '#f59e0b', hard: '#ef4444' };

export function QuestionCard({ question, onAnswer, disabled, result }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { setSelected(null); }, [question.id]);

  const handleSelect = useCallback((opt: string) => {
    if (disabled) return;
    setSelected(opt);
    onAnswer(opt);
  }, [disabled, onAnswer]);

  // Suporte a teclado: 1-4 ou A-D
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (disabled) return;
      const key = e.key.toUpperCase();
      let idx = -1;
      if (['1','2','3','4'].includes(key)) idx = parseInt(key) - 1;
      if (['A','B','C','D'].includes(key)) idx = key.charCodeAt(0) - 65;
      if (idx >= 0 && idx < question.options.length) {
        handleSelect(question.options[idx]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [disabled, question.options, handleSelect]);

  const getClass = (opt: string): string => {
    let cls = 'option';
    if (!result) {
      if (selected === opt) cls += ' selected';
      return cls;
    }
    if (opt === result.correctAnswer) return cls + ' correct';
    if (opt === selected && !result.isCorrect) return cls + ' wrong anim-shake';
    return cls;
  };

  const diffColor = DIFF_COLOR[question.difficulty] || '#64748b';
  const diffLabel = DIFF_LABEL[question.difficulty] || question.difficulty;

  return (
    <div className="card anim-fadeup" style={{ padding: '28px 24px' }}>
      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: diffColor, background: `${diffColor}18`, border: `1px solid ${diffColor}30`, padding: '2px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {diffLabel}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', padding: '2px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {question.category}
        </span>
        {!disabled && !result && (
          <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
            tecle A B C D
          </span>
        )}
      </div>

      {/* Texto da pergunta */}
      <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '24px', letterSpacing: '-0.01em' }}>
        {question.text}
      </p>

      {/* Opções */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={getClass(opt)}
            onClick={() => handleSelect(opt)}
            disabled={disabled}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <span style={{ flex: 1 }}>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
