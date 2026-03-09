import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/api';
import { LeaderboardEntry } from '../types';

interface Props { onBack: () => void; }

export function Leaderboard({ onBack }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard()
      .then(data => setEntries(data))
      .finally(() => setLoading(false));
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="card anim-fadeup" style={{ width: '100%', maxWidth: '460px', padding: '32px 28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button className="btn btn-ghost" onClick={onBack} style={{ width: 'auto', padding: '6px 0', fontSize: '13px' }}>
          ← Voltar
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', flex: 1, textAlign: 'center' }}>
          Ranking
        </h2>
        <div style={{ width: '48px' }} />
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div className="anim-spin" style={{ width: 28, height: 28, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto 10px' }} />
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Carregando...</p>
        </div>
      ) : entries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Nenhum jogador ainda.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Seja o primeiro a jogar!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {entries.map((entry, i) => (
            <div key={entry.id} className={`lb-row${i === 0 ? ' first' : ''}`}>
              <span style={{ fontSize: '18px', minWidth: '28px' }}>
                {medals[i] ?? <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>#{i + 1}</span>}
              </span>
              <span style={{ flex: 1, fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {entry.nickname}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: i === 0 ? 'var(--gold)' : 'var(--text-secondary)' }}>
                {entry.xp} XP
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
