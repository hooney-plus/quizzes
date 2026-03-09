import React from 'react';

interface Props { xp: number; nickname: string; streak: number; }

const RANKS = [
  { label: 'Iniciante',     min: -Infinity, color: '#64748b' },
  { label: 'Intermediário', min: 50,        color: '#6366f1' },
  { label: 'Avançado',      min: 200,       color: '#8b5cf6' },
  { label: 'Expert',        min: 500,       color: '#f59e0b' },
];

function getRank(xp: number) {
  return [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0];
}
function getProgress(xp: number): number {
  if (xp < 50)  return Math.max(0, ((xp + 15) / 65) * 100);
  if (xp < 200) return ((xp - 50)  / 150) * 100;
  if (xp < 500) return ((xp - 200) / 300) * 100;
  return 100;
}

export function XpBar({ xp, nickname, streak }: Props) {
  const rank     = getRank(xp);
  const progress = Math.min(100, Math.max(0, getProgress(xp)));

  return (
    <div className="xp-bar-wrap">
      <div className="xp-bar-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {nickname}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: rank.color, background: `${rank.color}18`, border: `1px solid ${rank.color}30`, padding: '2px 8px', borderRadius: '999px' }}>
            {rank.label}
          </span>
          {streak >= 2 && (
            <span className="streak-badge anim-streak">
              🔥 {streak}x
            </span>
          )}
        </div>
        <span className="xp-value" style={{ color: xp < 0 ? 'var(--error)' : 'var(--text-primary)' }}>
          {xp >= 0 ? '+' : ''}{xp} XP
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%`, background: rank.color }} />
      </div>
    </div>
  );
}
