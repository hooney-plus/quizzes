import React, { useEffect, useState } from 'react';
import { QuizStats } from '../types';

interface Props {
  xp: number;
  playerName: string;
  stats: QuizStats;
  onPlayAgain: () => void;
  onLeaderboard: () => void;
  onHome: () => void;
}

const RANKS = [
  { label: 'Iniciante',     min: -Infinity, color: '#64748b' },
  { label: 'Intermediário', min: 50,        color: '#6366f1' },
  { label: 'Avançado',      min: 200,       color: '#8b5cf6' },
  { label: 'Expert',        min: 500,       color: '#f59e0b' },
];

function getRank(xp: number) {
  return [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0];
}

export function FinishedScreen({ xp, playerName, stats, onPlayAgain, onLeaderboard, onHome }: Props) {
  const rank       = getRank(xp);
  const [countdown, setCountdown] = useState(10);
  const total      = stats.correct + stats.wrong + stats.timedOut;
  const accuracy   = total > 0 ? Math.round((stats.correct / total) * 100) : 0;

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c: number) => {
        if (c <= 1) { clearInterval(t); onHome(); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const trophy = xp >= 500 ? '🏆' : xp >= 200 ? '🥇' : xp >= 50 ? '🥈' : '🎯';

  return (
    <div className="card anim-fadeup" style={{ width: '100%', maxWidth: '420px', padding: '40px 32px', textAlign: 'center' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '52px', marginBottom: '8px' }}>{trophy}</div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Quiz finalizado!
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{playerName}</p>
      </div>

      {/* XP total */}
      <div style={{ padding: '20px', borderRadius: 'var(--radius-lg)', border: `1px solid ${rank.color}30`, background: `${rank.color}0d`, marginBottom: '20px' }}>
        <p style={{ fontSize: '44px', fontWeight: '800', color: rank.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
          {xp >= 0 ? '+' : ''}{xp}
          <span style={{ fontSize: '20px', marginLeft: '4px', fontWeight: 600 }}>XP</span>
        </p>
        <p style={{ fontSize: '13px', color: rank.color, marginTop: '6px', fontWeight: 600 }}>{rank.label}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <div className="stat-box">
          <p style={{ fontSize: '22px', fontWeight: '800', color: 'var(--success)' }}>{stats.correct}</p>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Acertos</p>
        </div>
        <div className="stat-box">
          <p style={{ fontSize: '22px', fontWeight: '800', color: 'var(--error)' }}>{stats.wrong + stats.timedOut}</p>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Erros</p>
        </div>
        <div className="stat-box">
          <p style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)' }}>{accuracy}%</p>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Precisão</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={onPlayAgain}>Jogar novamente</button>
        <button className="btn btn-secondary" onClick={onLeaderboard}>Ver ranking</button>
      </div>

      <p className="anim-pulse" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        Voltando ao início em {countdown}s
      </p>
    </div>
  );
}
